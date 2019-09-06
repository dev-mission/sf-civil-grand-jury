require('dotenv').config();

module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL",
    "logging": false
  },
  "test": {
    "use_env_variable": "DATABASE_TEST_URL",
    "logging": false
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "logging": false
  }
};
