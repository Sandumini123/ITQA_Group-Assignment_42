@about
Feature: Verify About Us video

  Scenario: Verify the About Us video plays
    Given I navigate to the homepage
    When I click the About Us tab
    Then The video should be displayed
    When I click the close button
    Then The video should not be visible

