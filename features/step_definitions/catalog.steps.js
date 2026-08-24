import { Given, When, Then } from "@cucumber/cucumber";
import assert from "node:assert";

const baseUrl = "http://localhost:3000";

let response;
let pageContent;
let productId;

Given("products are available in the catalog", function () {
  productId = 1;
});

When("I visit the products page", async function () {
  response = await fetch(`${baseUrl}/products`);
  pageContent = await response.text();
});

Then("I should see the available products", function () {
  assert.strictEqual(response.status, 200);
  assert.ok(pageContent.includes("Wireless Headphones"));
  assert.ok(pageContent.includes("Smart Watch"));
  assert.ok(pageContent.includes("Running Shoes"));
  assert.ok(pageContent.includes("Coffee Maker"));
});

Given("a product exists in the catalog", function () {
  productId = 1;
});

When("I visit that product's detail page", async function () {
  response = await fetch(`${baseUrl}/products/${productId}`);
  pageContent = await response.text();
});

Then("I should see the product's details", function () {
  assert.strictEqual(response.status, 200);
  assert.ok(pageContent.includes("Wireless Headphones"));
  assert.ok(pageContent.includes("79.99"));
  assert.ok(pageContent.includes("Electronics"));
});

Given("a product does not exist in the catalog", function () {
  productId = 999;
});

Then("I should see the product not-found page", function () {
  assert.ok(pageContent.includes("Product Not Found"));
});
