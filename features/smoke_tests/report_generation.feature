Feature: Data export 
  As anyone
  I want to export a report of data from 
  a survey in excel format and validate its contents

  Scenario: Export data report and validate contents
    Go to Flow home page
    When I select the link to "Run Reports"
    When I click on the "Comprehensive Report" button
    When I select the test survey group
    When I select the test survey
    When I click okay
    When I enter the test report excel name and location in the Save As field
    When I click Save
    When I convert the report to a CSV file
    When I compare the report to the expect result file
    Then I should see they are the same



