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
 /views                             - the parent directory for \layouts and \partials    
>>>>>>> develop

 
# Deployment Link
This application is deployed on Heroku.  The Heroku deployment link is:
https://justtechnews-ay.herokuapp.com/