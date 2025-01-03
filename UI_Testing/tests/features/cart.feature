Feature: Cart functionality
@cart
  Scenario: Display all phones
    Given I am on the home page
    When I select the "Phones" category
    Then I should see all phones displayed
@cart2
  Scenario: Add product to cart
    Given I am on the home page
    When I select a product
    And I am navigated to the product page
    And I click the "Add to cart" button
    Then I should see a success message "Product added"

@delete_product
Scenario:Delete a product in the cart
  Given I am on the home page
  When I select a product
  And I am navigated to the product page
  And I click the "Add to cart" button
  Then I should see a success message "Product added"
  When I click the "Cart" tab
  Then I should see the product in the cart
  When I delete the product from the cart
  Then I should see the cart is empty

