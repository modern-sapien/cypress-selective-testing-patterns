# cypress/grep notes
Selective testing patterns using built in selective testing methods within cypress &amp; plugins; @cypress/grep &amp; cypress-tags


## Cypress Selective Testing native ability notes

### General overview

Cypress provides some innate native selective testing ability out of the box that helps users quickly run spec files based on naming conventions & using wildcard references to directories containing spec files. 

It isn't possible to filter to the test level.

### Steps to get started

Step 1 - after installing Cypress run `npm install cypress`

Step 2 - have some tests in your e2e, ct or integration folder - whatever naming convention or pattern you're following works.

Step 3 - that's it

### Cypress Selective Testing explained

#### non-selective

``` json
 "npx cypress run"
 ```

This is our basic run all specs in run mode command. Every sub folder and spec within this directory will run unless .skip() or .only() has been invoked. 

#### selective:base

``` json
 "npx cypress run -s 'cypress/e2e/*'"
 ```

Cypress has built in selective testing methods. What we're looking at here is pretty simple, but powerful. We could create patterns from here when running in CI to help us focus on running certain directories in different stages of our pipeline. 

-s <<< short for spec, runs the same way as -spec

* <<< wild card for matching folders/sub-folders or files

'testpath/*'  <<< we're saying what directories we want to run tests from, skipping over any directories or flies that don't match that pattern

What are the implications here?

#### selective:nestedDirectories

``` json
"npx cypress run -s cypress/e2e/1-getting-started,cypress/e2e/3-todo-repeated"
 ```

Here we can see that we're referencing multiple directories of tests within e2e at this point, but what keeps us from having a `cypress/userFlow/userSignUp/` directory? Or a `cypress/criticalPath/` directory?

Nothing!

This is following the same pattern as the above, but we're ALSO passing a --tag flag to the Cypress Cloud when recording. Which will let us see These specific runs easier when reviewing analytics. 

The application here is EXTREMELY powerful as we could use this for running only tests within the following directories ```'frontEnd/*,criticalPath/*'``` & passing tags to tell us who should pay attention when they fail or flake. 

#### selective:nestedAndTags

``` json
"npx cypress run --record --key {hidethis} -s cypress/e2e/1-getting-started/todo.cy.js,cypress/e2e/3-todo-repeated/* --tag 'smoke,cypressSelective'"
 ```

We did it! We're passing in the folder & spec paths of the tests that we're interested in running and passing in the --tag as well within the run command so that we have better visibility within the Cloud. 

What are some things we notice here? 

If we have a very large and complex project this run script can get unwiedly very fast. What are our options to clean this up?