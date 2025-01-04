Feature: Successful login with valid credentials

  Scenario: Successful login with valid credentials
    Given Providing valid url
    When Providing valid username and password
    Then Clicking login button
