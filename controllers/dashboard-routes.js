const router    = require('express').Router();
const sequelize = require('../config/connection');
const withAuth  = require('../utils/auth');       // import the middleware authentication function


// Server Error: added "Vote" to the following line, probably not necessary
const { Post, User, Comment, Vote } = require('../models');

/////////////////////////////////////////////////////////////////////
// Route for the main page

router.get('/', withAuth, (req, res) => {  // "withAuth" returns here only if the user is logged-in
    Post.findAll({
      where: {
        // use the ID from the session (by a logged in user)
        user_id: req.session.user_id
      },
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
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });  // set "true" here, since a non-logged-in user can't get here
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
/////////////////////////////////////////////////////////////////////
// Route for the finding a post by "ID"

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
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
        if (dbPostData) {
          // serialize data before passing to template
          const post = dbPostData.get({ plain: true });

          res.render('edit-post', {
            post,
            loggedIn: true
          });
        } else {
          res.status(404).end();         // Server Error: added this "else" clause
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


//////////////////////////////////////////////////////////////////////////////
module.exports = router;

