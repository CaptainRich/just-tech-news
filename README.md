# Just-Tech-News

Richard Ay, October 2020 *(Updated May 2022)*

## Table of Contents
* [Project Objective](#project-objective)
* [Technologies Used](#technologies-used)
* [Application Structure & Logic](#application-structure-&-logic)
* [Deployment Link](#deployment-link)
* [Application Screen Shot](#application-screen-shot)

## Project Objective
Create a full-stack application to implement a bulletin board, based on the MVC architecture.

# Technologies Used
 * express
 * express-handlebars
 * express-session
 * connect-session-sequelize
 * dotenv (to privatize database name, user ID, and password - avoids GIT source control)
 * bcrypt (to encrypt user passwords)
 * mysql2
 * insomnia (for route testing)

# Application Structure & Logic
 .env                               - this file (private) contains the database name, user ID, and password

 /db/schema.sql                     - this file dumps the database and initializes a new one.

 /config/connection.js              - this file creates the connection to the database on startup.

 /models/index.js                   - this file collects the various table models and defines the associations between tables.

 /models/user.js                    - this file defines the "user" database table.

 /models/post.js                    - this file defines the "post" database table.

 /models/votes.js                   - this file defines the "vote" database table.

 /controllers/api/user-routes.js    - the API routes for the 'user' model
<<<<<<< HEAD

 /controllers/api/post-routes.js    - the API routes for the 'post' model   
    
 /controllers/api/comment-routes.js - the API routes for the 'comment' model     
=======
 /controllers/api/post-routes.js    - the API routes for the 'post' model      
 /controllers/api/comment-routes.js - the API routes for the 'comment' model 
 /controllers/home-routes.js        - the routes for the 'home page'
 /controllers/dashboard-routes.js   - the routes for "logged in" user
 /views                             - the parent directory for \layouts and \partials    
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> develop

=======
 /public/javascript                 - this directory contains the static pages for the front-end\
 /public/stylesheets                - this directory contains the CSS styling for the site
>>>>>>> develop
=======
 /views/layouts                     - contains the "main" handlebars file
 /views/partials                    - contains files for the remainder of the handlebars to avoid HTML duplication
 /public/javascript                 - this directory contains the static pages for the front-end\
 /public/stylesheets                - this directory contains the CSS styling for the site
 /_ _test__                         - this directory contains the unit tests
 /utils                             - contains the 'helper' functions for the handlebars routines
>>>>>>> develop
 
# Deployment Link
This application is deployed on Heroku.  The Heroku deployment link is:
https://justtechnews-ay.herokuapp.com/