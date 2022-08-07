

// This is a middleware function.  "next" passes everything to the next middleware (if any)
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  ////////////////////////////////////////////////////////////////////////////////
  module.exports = withAuth;