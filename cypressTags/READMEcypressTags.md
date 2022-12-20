# cypress-tags-notes
Selective testing patterns using built in selective testing methods within cypress &amp; plugins; @cypress/grep &amp; cypress-tags


## @cypress-tags package notes

### General overview

The cypress-tags package is maintained by a single community member & is the more stable of the two options.

### Steps to get started

Step 1 - after installing Cypress run `npm install cypress-tags`

Step 2 - config - add in setup node events requiring of the package directly follow the README from Cypress GitHub repo, not the npm docs.

Step 3 - support/e2e.js - require or import the package to have it run your e2e tests

### Use @cypress/grep & package.json explained

#### npm run native-test-run-specification

``` json
 "npx cypress run -s 'cypress/e2e/1-getting-started/*,cypress/e2e/3-JSONplaceholder-tests/*'"
 ```

Cypress has built in selective testing methods. What we're looking at here is pretty simple, but powerful. We could create patterns from here when running in CI to help us focus on running certain directories in different stages of our pipeline. 


-s <<< short for spec, runs the same way

* <<< wild card for matching folders/sub-folders or files

'testpath*,testpath/*'  <<< we're saying what directories we want to run tests from, skipping over any directories or flies that don't match that pattern

#### npm run test-record-run-cloud-tag

``` json
"cypress run 'cypress/e2e/2-advanced-examples/*' --record --tag 'staging'
 ```

This is following the same pattern as the above, but we're ALSO passing a --tag flag to the Cypress Cloud when recording. Which will let us see These specific runs easier when reviewing analytics. 

The application here is EXTREMELY powerful as we could use this for running only tests within the following directories ```'frontEnd/*,criticalPath/*'``` & passing tags to tell us who should pay attention when they fail or flake. 

#### npm run test-run-folder-cypress/grep

``` json
"npx cypress run -s 'cypress/e2e/3-*/*' --env grep=JSON"
 ```

Finally! We're using @cypress/grep package to run some tests using this grepping pattern. What do you notice? We're using a wildcard pattern for matching any directories that follow the cypress/e2e/ file path and start with "3-" & then we're invoking the package by calling "--env grep='JSON'"

This will run only it() OR describe() blocks in those matching directories that contain JSON in the test title. 

#### npm run test-run-cypress/grep

``` json
"npx cypress run --env grep=JSON"
 ```

We've run the same command again, but have removed the directory/spec specification. Run these two commands and see what the difference in overall duration is.

... pretend like you did it, or I was waiting patiently for you to complete your work. 

It TOOK A LONG TIME!

For EVERY matching directory (which is all of them if we haven't specified any). We're telling our agent/node/vm/etc. to look through each test in all of the specs within those directories. 

Imagine having 500 e2e tests & long spec files (don't do this) and you're only using a handful of tags on some tests.