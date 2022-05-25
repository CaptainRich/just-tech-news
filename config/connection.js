
// Import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// Load the environment variables setup with the DOTENV package
require('dotenv').config();

// Create the connection to our database, pass in your MySQL information for username and password
//const sequelize = new Sequelize('just_tech_news_db', 'root', 'xxxxxxxxxxx', {

  let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // The variables DB_NAME, DB_USER, and DB_PW are defined in the ".env" file, accessed via the DOTENV package.
   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
  module.exports = sequelize;