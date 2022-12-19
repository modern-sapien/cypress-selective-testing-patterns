import { defineConfig } from "cypress";
import { tagify } from "cypress-tags";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', tagify(config));
    },
  },
});