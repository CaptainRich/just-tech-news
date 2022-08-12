
// Import the various database tables.
const User    = require('./User');
const Post    = require('./Post');
const Vote    = require('./Vote');
const Comment = require('./Comment');


///////////////////////////////////////////////////////////////////////////////////////////////
// Define the (model) associations between the tables
User.hasMany(Post, {
  foreignKey: 'user_id'            // this links the 'user.id' column with the 'post.user_id' column
});

Post.belongsTo(User, {
  foreignKey: 'user_id',           // a post can only belong to one user
  onDelete: 'SET NULL'             // ServerError, added this line
});

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id',
  onDelete: 'SET NULL'            // ServerError, added this line
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'            // ServerError, added this line
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'            // ServerError, added this line
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'            // ServerError, added this line
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'            // ServerError, added this line
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'            // ServerError, added this line
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'            // ServerError, added this line
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

////////////////////////////////////////////////////////////////////////////////////////////
// Export an object with the above database properties.
module.exports = { User, Post, Vote, Comment };