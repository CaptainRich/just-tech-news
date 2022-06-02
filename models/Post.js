

// Import the modules we need
const { Model, DataTypes } = require('sequelize');
const sequelize            = require('../config/connection');

// Create the Post model
class Post extends Model {

  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            'vote_count'
          ]
        ]
      });
    });
  }
}

// create fields/columns for Post model
Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      user_id: {         // This is a foreign key, the posters ID from the "User" model.
        type: DataTypes.INTEGER,
        references: {    // This references the user making the post, from the "User" model
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,               // Pass in our imported sequelize connection (the direct connection to our database)
      freezeTableName: true,   // DO NOT pluralize name of database table
      underscored: true,       // Use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
      modelName: 'post'        // Make it so the model name stays lowercase in the database
    }
  );

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Export the Post model for the rest of the application to use/access.

  module.exports = Post;