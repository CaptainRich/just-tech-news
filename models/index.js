

const User = require('./User');
const Post = require('./Post');

// Define the associations between the tables
User.hasMany(Post, {
    foreignKey: 'user_id'            // this links the 'user.id' column with the 'post.user_id' column
});

Post.belongsTo(User, {
    foreignKey: 'user_id',           // a post can only belong to one user
  });

module.exports = { User, Post };