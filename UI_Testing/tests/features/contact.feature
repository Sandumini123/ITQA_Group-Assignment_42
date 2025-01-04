
Feature: contact form
@contact_empty
  Scenario:Contact form submit with empty field
    Given I navigate to the home page
    When I click the "Contact" button
    Then The contact form should be displayed
    When I click the "Send Message" button
    Then An error message should be displayed

@contact_with_data
  Scenario: Contact form submit with valid input data
    Given I navigate to the home page
    When I click the "Contact" button
    Then The contact form should be displayed
    When I fill in the "Contact Email" field with "test@example.com"
    And I fill in the "Contact Name" field with "Test User"
    And I fill in the "Message" field with "This is a test message."
    When I click the "Send Message" button
    Then A success message should be displayed


@contact_clear_fields
Scenario: Closing the contact form should clear the input fields
  Given I navigate to the home page
  When I click the "Contact" button
  And I fill in the "Contact Email" field with "test@example.com"
  And I fill in the "Contact Name" field with "Test User"
  And I fill in the "Message" field with "This is a test message."
  When I click the "Close" button
  And I click the "Contact" button again
  Then The input fields should be empty



    