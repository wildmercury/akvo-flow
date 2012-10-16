# -*- coding: utf-8 -*-

from lettuce import after, before, step, world
from splinter.browser import Browser


@step('Go to home page')
def go_to_home_page(step):
    world.browser.visit('http://%s' % world.SITE_UNDER_TEST)

@step('Then I should see the title "([^"]*)"')
def then_i_should_see_the_title(step, expected_title):
    assert world.browser.title == expected_title

@step('And I also see a "([^"]*)" link')
def and_i_also_see_link(step, expected_link_text):
    assert world.browser.find_link_by_text(expected_link_text)

@step('And I also see a "([^"]*)" link')
def and_i_also_see_a_projects_link(step, projects_link):
    assert world.browser.find_link_by_text(projects_link)

@step('Then I should see "([^"]*)"')
def then_i_should_see_text(step, expected_text):
    assert world.browser.is_text_present(expected_text)


