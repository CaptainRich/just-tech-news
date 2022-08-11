

const router          = require('express').Router();

const apiRoutes       = require('./api');
const homeRoutes      = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');


router.use( '/', homeRoutes );
router.use( '/dashboard', dashboardRoutes);   // all dashboard views will be prefixed with "/dashboard".
router.use( '/api', apiRoutes );


// Server Error: comment out these lines because they don't appear in the "solution 14.5 zip"
// router.use((req, res) => {
//   res.status(404).end();
// });
// Server Error: End commenting


//////////////////////////////////////////////////////////////////////
module.exports = router;