# cypress/grep notes
Selective testing patterns using built in selective testing methods within cypress &amp; plugins; @cypress/grep &amp; cypress-tags


## @cypress/grep package notes

### General overview

Please read the root README.md file for the general overview explaining the value of selective testing. This README will predominantly detail @cypress/grep related patterns.

### Steps to get started

Step 1 - after installing Cypress run `npm install @cypress/grep`

Step 2 - config - add in setup node events requiring of the package directly follow the README from Cypress GitHub repo, not the npm docs.

Step 3 - support/e2e.js - require or import the package to have it run your e2e tests

### Use @cypress/grep & package.json explained

#### cygrep:base

``` json
 "npx cypress run --env grep=staging"
 ```

Cypress has built in selective testing methods. What we're looking at here is pretty simple, but powerful. We could create patterns from here when running in CI to help us focus on running certain directories in different stages of our pipeline. 


-s <<< short for spec, runs the same way

* <<< wild card for matching folders/sub-folders or files

'testpath*,testpath/*'  <<< we're saying what directories we want to run tests from, skipping over any directories or flies that don't match that pattern

#### cygrep:base

``` json
"cypress run 'cypress/e2e/2-advanced-examples/*' --record --tag 'staging'
 ```

We're using @cypress/grep package to run some tests using this grepping pattern. What do you notice? We're invoking the package by calling "--env grep='staging'", but this would also run using "--env grep=staging". 

This will run only it() OR describe() blocks in those matching directories that contain staging anywhere in their test title. 

#### cygrep:baseTags

``` json
"npx cypress run --env grepTags='banana'" ```

We've run a slightly different command here referencing an array of tags within the test object itself.

```javascript
  it("displays two todo items by default", { tags: ['banana', 'some-other-tag'] }
```

When we invoke the package this time using grepTags we are asking to traverse just beyond the it() or describe() title to an object containing a string or array or strings to reference tags we'd like to grep by.

What are the come aways here from running these tests? 
#### cygrep-and-seletive


We've run the same command again, but have removed the directory/spec specification. Run these two commands to see what the overall impact to duration is.

This run command was much faster! Why? 

Because without specifiying the folder or spec pattern we're asking our machine to look within every spec file available to us and then to run based on what we find.

Imagine having 500 e2e tests & long spec files (don't do this) and you're only using a handful of tags on some tests.