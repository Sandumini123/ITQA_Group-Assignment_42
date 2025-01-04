@signUp
Feature: Sign Up functionality

  Background:
    Given I am navigate to home page

  Scenario: Sign Up user
    When I click the "Sign Up" tab
    Then It should display the Sign Up form
    Then I enter the username field with "djuweiwiureh"
    Then I enter the password field with "54876fhihfi"
    Then I click the "Sign Up" button
    Then It should display an alert message "Sign up successful"