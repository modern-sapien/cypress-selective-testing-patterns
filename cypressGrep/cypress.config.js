const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://jsonplaceholder.typicode.com/",
    // use Studio to generate tests fast by UI!
    experimentalStudio: true,

    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
    "env": {
      "grepOmitFiltered": true
    }
  },
});
