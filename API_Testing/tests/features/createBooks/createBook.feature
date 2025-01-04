Feature: Create Book API Tests
  As a user of the library system
  I want to test the create book functionality
  So that I can ensure it handles various scenarios correctly

# correct
  @valid-request
  Scenario: Successfully create a book  
    Given I am logged in as "admin" with password "password"
    When I create a book with the following details:
      | id   | title      | author     |
      |  | "Hilly" | "Hi11111" |
    Then the response status code should be 201
    And the response should contain the book's id

  @duplicate-title
  Scenario: Create a book with a duplicate title
    Given I am logged in as "admin" with password "password"
    When I create a book with the following details:
      | id   | title      | author     |
      | 124  | "Duplicate" | "Jane Doe" |
    Then the response status code should be 208
    # And the response message should be "Book Already Exists"

  @invalid-id
  Scenario: Create a book with invalid ID type(BUG EXPECTED)
    Given I am logged in as "admin" with password "password"
    When I create a book with the following details:
      | id   | title        | author     |
      | "hiiii" | "Hi111" | "Hi111" |
    Then the response status code should be 400
    And the response message should be "Invalid parameter 'id'."