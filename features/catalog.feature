Feature: Product catalog

  As a visitor
  I want to browse the product catalog
  So that I can view available products and their details

  Scenario: View the product catalog
    Given products are available in the catalog
    When I visit the products page
    Then I should see the available products

  Scenario: View a product's details
    Given a product exists in the catalog
    When I visit that product's detail page
    Then I should see the product's details

  Scenario: Request a product that does not exist
    Given a product does not exist in the catalog
    When I visit that product's detail page
    Then I should see the product not-found page