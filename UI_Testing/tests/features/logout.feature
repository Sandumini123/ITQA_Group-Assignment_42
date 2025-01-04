
Feature: Logout functionality
@logout
  Scenario: User logs in and logs out successfully
    Given I am on the homepage
    When I login with username "panvol" and password "test@123"
    And I click on the logout button
    And I confirm the logout
    Then I should be logged out successfully
