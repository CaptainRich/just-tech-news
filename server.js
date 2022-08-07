

const path           = require('path');
const express        = require('express');
const session        = require('express-session');
const exphbs         = require('express-handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);


const routes         = require('./controllers');
const sequelize      = require('./config/connection');
const helpers        = require('./utils/helpers');       // inform Handlebars about the helper functions

const hbs = exphbs.create( {helpers} );                  // pass the helper functions to Handlebars

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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));  // so this application can use items in \public
app.use(session(sess));

app.engine( 'handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

app.use(require('./controllers/'));       // added after comparing to Bootcamp code 14.3.zip

// Turn on the connection to db and server. This takes the models and connects them to the database tables.
sequelize.sync({ force: false }).then(() => {       // 'true' forces the tables to re-create if there are association changes.
  app.listen(PORT, () => console.log('Now listening'));
});