# cypress-tags-notes
Selective testing patterns using built in selective testing methods within cypress &amp; plugins; @cypress/grep &amp; cypress-tags


## @cypress-tags package notes

### General overview

The cypress-tags package is maintained by a single community member & is the more stable of the two options.

### Steps to get started

Step 1 - after installing Cypress run `npm install cypress-tags`

Step 2 - config - add in setup node events requiring of the package directly follow from the cypress.config.ts file within this directory. 

Step 3 - support/e2e.js - No need to require or import here as this package works from the config and you're not running any custom commands or setup. 

### Use cypress-tags & package.json explained

What we see in the example below is two things, we are setting up the basic run with the command to use this selective testing method by passing it through an environment variable referenced at run time in the first script and the script below passing it in the default pattern provided by the plugins documentation. Windows machines handle scripts at run time different based on the terminal they are running scripts with. Let's not get bogged down here, this is just what it is. 

``` json
    "tag:include": "npx cypress run --env CYPRESS_INCLUDE_TAGS=json",
    "tag:includeDoesntWorkOnWindows": "CYPRESS_INCLUDE_TAGS=json npx cypress run",
 ```


```javascript
  it(["smoke", "json"], "displays two todo items by default", () => {
    cy.get(".class element").contains("something you want it to contain");
  });
```

#### tag:include

``` json
    "tag:include": "npx cypress run --env CYPRESS_INCLUDE_TAGS=json",
 ```

The cypress-tags references the scripts above to look through all describe(), context() & it() blocks to see if there is an array of tags to check. If the tags match the run command script we run those tests. 

The cypress-tags package is very straight forward implementation.

#### tag:exclude

``` json
    "tag:exclude": "npx cypress run --env CYPRESS_EXCLUDE_TAGS=banana",
 ```

By using the exclude_tags command at run time we will filter out all of the describe(), context() & it() blocks that have an item in their array that matches this case

#### tag:includeMultiple

``` json
"CYPRESS_INCLUDE_TAGS=smoke,json npx cypress run"
 ```

Notice here how the include tag for multiple is at the front. Due to some issues with how Windows runs this package if you want to run multiple tags you should not do this approach only for Macs. This will not work on Windows and the previous approach of passing the env variable will not work at run time. You can probably get around this, but that approach is out of scope in this example project.

This run time command will run all tests that have "smoke" or "json" in their array of tags.
#### tag:includeAnd

``` json
"CYPRESS_INCLUDE_USE_BOOLEAN_AND=true CYPRESS_INCLUDE_TAGS=smoke,json npx cypress run"
 ```

This run time command will execute only those tests that have all matching tags within their array of tags. So in this case, "smoke" & "json" must be present in the array in order to be run. 

#### tag:excludeAnd

``` json
"CYPRESS_EXCLUDE_USE_BOOLEAN_AND=true CYPRESS_EXCLUDE_TAGS=smoke,json npx cypress run"
 ```

This run time command will EXCLUDE from running only those tests that have all matching tags within their array of tags. So in this case if any tag arrays contain both, "smoke" & "json" they will not be run, but all other tests will.

#### tag:includeExcludeExpression 

``` json
"CYPRESS_USE_INCLUDE_EXCLUDE_EXPRESSIONS=true CYPRESS_INCLUDE_EXPRESSION='smoke OR banana' CYPRESS_EXCLUDE_EXPRESSION='json' npx cypress run"
 ```

After all of this you want to use both, huh? You can absolutely do this, and here's an example you can take this further by including even more in the include or exclude expression like '(smoke AND regression) AND (feature1 OR banana)'.
