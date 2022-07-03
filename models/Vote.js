

// Import the modules we need
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// Create the "Vote" model, fields/columns
class Vote extends Model {}                            // 'Vote' inherits all of the "Model" class functionality

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {                                  // Reference the 'user' table to obtain this foreign key
          model: 'user',
          key: 'id'
        }
     },
     post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {                                // Reference the 'post' table to obtain this foreign key
          model: 'post',
          key: 'id'
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vote'
  }
);


module.exports = Vote;