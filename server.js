

const path           = require('path');
const exphbs         = require('express-handlebars');
const session        = require( 'express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const express        = require('express');
const routes         = require('./controllers');
const sequelize      = require('./config/connection');

const hbs = exphbs.create({});

const sess = {
  secret: 'Super secret secret',   // replace this with a real password in the '.env' file
  cookie: {},                      // this is needed to tell the session to use cookies. Options can be added to this object.
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.engine( 'handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// Turn on the connection to db and server
sequelize.sync({ force: false }).then(() => {       // 'true' forces the tables to re-create if there are association changes.
  app.listen(PORT, () => console.log('Now listening'));
});