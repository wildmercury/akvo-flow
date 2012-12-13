# -*- coding: utf-8 -*-

from lettuce import after, before, step, world
from splinter.browser import Browser

#world.SITE_UNDER_TEST = 'uat.akvo.org/flow/dashboard.html'
world.SITE_UNDER_TEST = 'flowakvo.appspot.com/Dashboard.html'
world.TEST_GOOGLE_USERNAME = 'testakvo@gmail.com'
world.TEST_GOOGLE_PASSWORD = 'enter password here'
world.TEST_SURVEY_GROUP = 'SNVERMIS'
world.TEST_SURVEY_NAME = 'Rural Point sources'

@before.all
def setUp():
    world.browser = Browser('firefox')

@after.all
def tearDown(test_results):
    world.browser.quit()

