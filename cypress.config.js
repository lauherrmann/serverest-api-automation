const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;
const pg = require('pg');

module.exports = defineConfig({
  modifyObstructiveCode: true,
  projectId: 'servrest-api-automation',
  viewportWidth: 1300,
  viewportHeight: 720,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  defaultCommandTimeout: 20000,
  requestTimeout: 50000,
  retries: { runMode: 1 },
  env: { },
  e2e: {
    supportFile: false,
    baseUrl: `https://serverest.dev`,
    specPattern: ['cypress/features/**/*.feature'],
    setupNodeEvents(on, config) {
      if (config.isTextTerminal) console.log('Running in terminal mode!');
      on('before:run', () => console.log("Cypress Started"));
      on('before:spec', (spec) => console.log("Running... " + spec.fileName));
      on('task', {
        dbQuery({ dbConfig, query }) {
          const client = new pg.Pool(dbConfig);
          return client.query(query);
        },
        print(s) {
          console.log(s);
          return null;
        },
      });
      on('file:preprocessor', cucumber());
      config.accessToken = process.env.accessToken;
      return config;
    }
  }
});
