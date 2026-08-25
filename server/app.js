require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CatalogFlow API");
});

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Product" ORDER BY "id" ASC',
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get products");
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, price, category, description, image, featured } = req.body;

    const result = await pool.query(
      `INSERT INTO "Product"
      ("name", "price", "category", "description", "image", "featured")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [name, price, category, description, image, featured],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to create product");
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query('SELECT * FROM "Product" WHERE "id" = $1', [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get product");
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { name, price, category, description, image, featured } = req.body;

    const result = await pool.query(
      `UPDATE "Product"
       SET "name" = $1,
           "price" = $2,
           "category" = $3,
           "description" = $4,
           "image" = $5,
           "featured" = $6
       WHERE "id" = $7
       RETURNING *`,
      [name, price, category, description, image, featured, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to update product");
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      'DELETE FROM "Product" WHERE "id" = $1 RETURNING *',
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete product");
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
