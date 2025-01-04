
Feature: Delete Books API

  Background:
    Given I am logged in as an authorized admin user

  @delete-invalid-id
  Scenario: Attempt to delete a book with an invalid ID
    Given I am logged in as an authorized admin user
    When I delete the book with ID "abc"
    Then the response status code should be 400
    And the response message should be "Invalid parameter 'id'."
