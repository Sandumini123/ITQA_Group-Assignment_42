@signup

Feature: Open Sign-Up Modal

  Scenario: Verify that the "Sign up" modal opens successfully
    Given Navigating to the homepage
    When Clicking the "Sign up" link in the navigation bar
    Then The "Sign up" modal should appear on the screen
