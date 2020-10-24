

const router = require('express').Router();

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

/////////////////////////////////////////////////////////////////////////////////////////
// Setup the main homepage route.
router.get('/', (req, res) => {
  
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {

      // Need to serialize the entire array of posts
      const posts = dbPostData.map(post => post.get({ plain: true }));

      // 'homepage.handlebars' is implied here, the second argument is our HTML data
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });                  
});



module.exports = router;