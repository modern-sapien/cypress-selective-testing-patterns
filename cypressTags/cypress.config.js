const { defineConfig } = require("cypress");
const { tagify } = require("cypress-tags");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://jsonplaceholder.typicode.com/",
    // use Studio to generate tests fast by UI!
    experimentalStudio: true,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      on("file:preprocessor", tagify(config));
    },
  },
});
