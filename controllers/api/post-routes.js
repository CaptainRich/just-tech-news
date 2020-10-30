

// Import the packages and models needed.
const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth  = require('../../utils/auth');
const { Post, User, Vote, Comment } = require('../../models');    // Need all models here for our JOINs

///////////////////////////////////////////////////////////////////////////////////////////////////
// Get all users in the database
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        // include the Comment model here:
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });


  
///////////////////////////////////////////////////////////////////////////////////////////////////
// Get one user from the database
router.get('/:id', (req, res) => {
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
      // Include the Comment model here, which also includes the user model:
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
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route to create a new post
router.post('/', withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update when a vote is made, this creates "vote data"   
// PUT /api/posts/upvote
router.put('/upvote', withAuth, (req, res) => {
  // Use the custom static method created in models/Post.js
  // Make sure the session exists first.
  if (req.session) {
    // Pass the session ID along with all destructured properties on req.body
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route to update a post's title
router.put('/:id', withAuth, (req, res) => {

  // Expects 'post id', 'new post title'
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route to delete a post
router.delete('/:id', withAuth, (req, res) => {
  // Post.destroy({
  //   where: {
  //     id: req.params.id
  //   }
  // })
  //   .then(dbPostData => {
  //     if (!dbPostData) {
  //       res.status(404).json({ message: 'No post found with this id' });
  //       return;
  //     }
  //     res.json(dbPostData);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });


    Post.findOne({
      where: {id: req.params.id},
      include: [Comment]
    })
    .then(post => {
      post.comments.forEach(comment => {
        comment.destroy();
      })
      post.destroy();
      res.end();
    })

});


  module.exports = router;