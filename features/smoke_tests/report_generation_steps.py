# -*- coding: utf-8 -*-

from lettuce import step, world, before
from time import sleep

@step(u'Go to Flow home page')
def go_to_flow_home_page(step):
    if world.browser.is_text_present('Field Level Operations Watch uses Google Accounts for Sign In'):
        world.browser.fill('Email', world.TEST_GOOGLE_USERNAME)
        world.browser.fill('Passwd', world.TEST_GOOGLE_PASSWORD)
        world.browser.find_by_name('signIn').first.click()
    #print dir(world.browser)
    world.browser.find_by_name('submit_true').first.click()
    world.browser.find_by_id('gwt-uid-20').first.click()
    world.browser.find_by_css('.admin-button')[4].click() 
    sleep(5)
    #drop_down_menu = world.browser.find_by_xpath('/html/body/div[2]/div/table/tbody/tr[2]/td[2]/div/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[1]/table/tbody/tr/td[2]/select').first
    #drop_down_menu = world.browser.find_by_xpath("//div[@class='dialogMiddleCenterInner']/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[1]/table/tbody/tr/td[2]/select").first
    #drop_down_menu = world.browser.find_by_xpath("//select[@class='gwt-ListBox']").first
    #survey_group = world.browser.find_by_xpath("//select[@class='gwt-ListBox'][1]/option[text()='SNVERMIS']").first
    survey_group = world.browser.find_by_xpath("//select[@class='gwt-ListBox']/option[text()='"+world.TEST_SURVEY_GROUP+"']").first
    survey_group.click()
    survey = world.browser.find_by_xpath("//select[@class='gwt-ListBox']/option[text()='"+world.TEST_SURVEY_NAME+"']").first
    survey.click()
    world.browser.find_by_css('.gwt-Button').first.click()  
    sleep(5)
    #window = world.browser.get_alert()
    #print window 
    print dir(world.browser)
    world.browser.switch_to_window('Save')
    
    #save_window = world.browser.driver.switch_to_active_element()
    #save_window = world.browser.window_handles.first
    #world.browser.switch_to_window(save_window)
    #world.browser.fill('Save As', 'blah/blkj/tickity/boom/boom')
    #print save_window
    #save_window.fill('Save', 'blah/blkj/tickity/boom/boom')
    #print dir(save_window)

    #print dir(drop_down_menu)

 
    #world.browser.select(drop_down_menu,'SNVERMIS')
    #survey_group = world.browser.find_by_css('.gwt-ListBox').first
    #survey_group.find_option_by_text(world.TEST_SURVEY_GROUP).first.select()

@step(u'When I select the link to "([^"]*)"')
def when_i_select_the_link_to_group1(step, group1):
    assert False, 'This step must be implemented'

@step(u'When I click on the "([^"]*)" button')
def when_i_click_on_the_group1_button(step, group1):
    assert False, 'This step must be implemented'

@step(u'When I select the test survey group')
def when_i_select_the_test_survey_group(step):
    assert False, 'This step must be implemented'

@step(u'When I select the test survey')
def when_i_select_the_test_survey(step):
    assert False, 'This step must be implemented'

@step(u'When I click okay')
def when_i_click_okay(step):
    assert False, 'This step must be implemented'

@step(u'When I enter the test report excel name and location in the Save As field')
def when_i_enter_the_test_report_excel_name_and_location_in_the_save_as_field(step):
    assert False, 'This step must be implemented'

@step(u'When I click Save')
def when_i_click_save(step):
    assert False, 'This step must be implemented'

@step(u'When I convert the report to a CSV file')
def when_i_convert_the_report_to_a_csv_file(step):
    assert False, 'This step must be implemented'

@step(u'When I compare the report to the expect result file')
def when_i_compare_the_report_to_the_expect_result_file(step):
    assert False, 'This step must be implemented'

@step(u'Then I should see they are the same')
def then_i_should_see_they_are_the_same(step):
    assert False, 'This step must be implemented'