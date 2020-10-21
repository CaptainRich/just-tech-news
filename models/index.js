

const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// Define the associations between the tables
User.hasMany(Post, {
  foreignKey: 'user_id'            // this links the 'user.id' column with the 'post.user_id' column
});

Post.belongsTo(User, {
  foreignKey: 'user_id',           // a post can only belong to one user
});

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote };