@checkout
Feature: Checkout Page Validation

  @checkout
  
 Scenario: Complete a purchase with valid data
    Given I am on the index page main page
    When I click on a product
    And I proceed to the product page
    #And I add a product to the cart 
    And I navigate to the cart page
    And I proceed to checkout
    And I fill the form with valid data
    And I should see a confirmation message
    And I click ok
    Then I should proceed to index page

  Scenario: Submit empty checkout form
    Given I am on the Cart page with items
    When I attempt to place an order by clicking place order button
    And I enter null values to the given form
    And I click purchese button
    Then it should give a empty error message

 Scenario: checking whether the year of the credit card is valid
    Given I am on the Cart page with items
    When I attempt to place an order by clicking place order button
    And I enter a future year to the year column
    And I click the purchese button
    Then it should give an error message


 


  

