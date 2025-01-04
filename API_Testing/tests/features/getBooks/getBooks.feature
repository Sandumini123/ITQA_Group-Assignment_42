@GetBooks
Feature: Get All Books API Test
  As a user of the library system
  I want to test the create book functionality
  So that I can ensure it handles various scenarios correctly

  Background:
    Given I am logged in as "admin" with password "password"

  Scenario Outline: Fetch books with different credentials
    Given the GetAllBooks API is up and running
    When I send a "<credentialType>" GETBooks request to "/api/books"
    Then the "<credentialType>" GetBooks response status code should be <statusCode>
    And the "<credentialType>" response should contain a list of books or indicate no books are available

    Examples:
      | credentialType | statusCode |
      | valid          | 200        |
      | invalid        | 401        |