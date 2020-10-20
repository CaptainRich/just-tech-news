

const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// Turn on the connection to db and server
sequelize.sync({ force: false }).then(() => {       // 'true' forces the tables to re-create if there are association changes.
  app.listen(PORT, () => console.log('Now listening'));
});