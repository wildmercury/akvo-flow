Feature: Home page navigation
  As anyone
  I want to view the Akvo home page
  In order to see what's available

  Scenario: View home page
    Go to home page
    Then I should see the title "Akvo Flow - Dashboard"
    And I also see a "surveys" link
    And I also see a "devices" link
    And I also see a "data" link
    And I also see a "reports" link
    And I also see a "maps" link
    And I also see a "users" link
    And I also see a "admin" link
    And I also see a "login" link
    And I also see a "register" link

