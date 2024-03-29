

const { Model, DataTypes } = require('sequelize');      // imports from 'Sequelize'
const sequelize = require('../config/connection');      // import the database connection 
const bcrypt    = require( 'bcrypt' );                  // for password hashing (encryption)

// Create the User model
class User extends Model {                             // 'User' inherits all of the "Model" class functionality

  // Set up method to run on instance data (per user) to check password validity.  "this" refers to the user 
  // currently trying to login.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
    //return bcrypt.compare(loginPw, this.password);     // use the "async" version, always seems to return "true"
  };
};


// Define table columns and configuration.  The "init" method provides the context for the methods inherited 
// from the "Sequelize Model" class.
User.init(
    {   // Define the table columns (there are 4)
        // Define an id column
        id: {
          // use the special Sequelize DataTypes object to provide what type of data it is
          type: DataTypes.INTEGER,
          // this is the equivalent of SQL's `NOT NULL` option
          allowNull: false,
          // instruct that this is the Primary Key
          primaryKey: true,
          // turn on auto increment
          autoIncrement: true
        },
        // Define a username column
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        // Define an email column
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          // there cannot be any duplicate email values in this table
          unique: true,
          // if allowNull is set to false, we can run our data through validators before creating the table data
          validate: {
            isEmail: true
          }
        },
        // Define a password column
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            // this means the password must be at least four characters long
            len: [4]
          }
        }
    },
    {
      // Add the 'hooks' section, needed for password hashing with bcrypt
      hooks: {
        // Set up 'beforeCreate' lifecycle "hook" functionality
        // This first variation uses a 'promise'
        // beforeCreate(userData) {
        //   return bcrypt.hash(userData.password, 10).then(newUserData => {
        //     return newUserData
        //   });
        // }

        // This ability is needed when a new user signs up.
        // Set up 'beforeCreate' lifecycle "hook" functionality
        // This second variation uses 'async/await' instead of the 'promise' above.
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },

        // This ability is needed when a user updates his/her password.
        // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
      },

      // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

      // Pass in our imported sequelize connection (the direct connection to our database)
      sequelize,
      // DO NOT automatically create createdAt/updatedAt timestamp fields
      timestamps: false,
      // DO NOT pluralize name of database table
      freezeTableName: true,
      // Use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
      underscored: true,
      // Make it so the model name stays lowercase in the database
      modelName: 'user'
  }
);


// Export the user table.
module.exports = User;