
Feature: contact form
@contact_empty
  Scenario:Contact form submit with empty field
    Given I navigate to the home page
    When I click the "Contact" button
    Then The contact form should be displayed
    When I click the "Send Message" button
    Then An error message should be displayed





    