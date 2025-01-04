Feature: Create Book API Tests
  As a user of the library system
  I want to test the create book functionality
  So that I can ensure it handles various scenarios correctly

# correct
  @missing-title
  Scenario: Create a book without a title(BUG EXPECTED)
    Given I am logged in as "admin" with password "password"
    When I create a book with the following details:
      | title   | author    |
      |         | "test again" |
    Then the response status code should be 400
    And the response should contain the book's id


# correct
  @missing-author
  Scenario: Create a book without an author(BUG EXPECTED)
    Given I am logged in as "admin" with password "password"
    When I create a book with the following details:
      | title        | author |
      | "Hi11" |         |
    Then the response status code should be 400
    And the response should contain the book's id










