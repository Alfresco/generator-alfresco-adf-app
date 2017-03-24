##TEST app generator

## Introduction

The test on the app generato are subdivided in three part:

1 Template and file well formed check 
2 Cross Browser test

## 1 Template and file well formed check 

In order to run the template generator the command is:

npm run test 

## 2 Cross Browser test

In order to run the cross browser test locally:

step 1:

Note the test are at moment running against chrome, firefox, ie11, opera and safari.
set the environment variable with your username and password :

export BROWSERSTACK_USERNAME=YOUR_BROWSERSTACK_TEST_USER
export BROWSERSTACK_ACCESS_KEY=YOUR_BROWSERSTACK_TEST_KEY

step 2:

run the [browserstack local](https://www.browserstack.com/local-testing) testing binary :
$ ./BrowserStackLocal\ YOUR_BROWSERSTACK_TEST_USER

step 3:

npm run cross-browsers-test
