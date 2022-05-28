

const router = require('express').Router();


// Collect all of the API routes into a single package.
const userRoutes    = require('./user-routes.js');
const postRoutes    = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

/////////////////////////////////////////////////////////////////////////
module.exports = router;