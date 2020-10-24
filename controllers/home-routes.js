

const router = require('express').Router();

/////////////////////////////////////////////////////////////////////////////////////////
// Setup the main homepage route.
router.get('/', (req, res) => {
  // 'homepage.handlebars' is implied here, the second argument is our HTML data
  res.render('homepage', {
    id: 1,
    post_url: 'https://handlebarsjs.com/guide/',
    title: 'Handlebars Docs',
    created_at: new Date(),
    vote_count: 10,
    comments: [{}, {}],
    user: {
      username: 'test_user'
    }
  });                  
});



module.exports = router;