

const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

////////////////// Define the various endpoints needed  ////////////////////////////////////////////////
// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method, inherited from the "Model" class.
    User.findAll({
        attributes: { exclude: ['password'] },    // make sure the password doesn't come back
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
          },
          {
            model: Post,
            attributes: ['title'],
            through: Vote,
            as: 'voted_posts'
          }
        ]
    })                            // .findAll is equivalent to   "SELECT * FROM users"
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//////////////////////////////////////////////////////////////////////////////////////////////////
// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },    // make sure the password doesn't come back
    where: {
      id: req.params.id   // This is equivalent to "SELECT * FROM users WHERE id  = 1"
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'created_at']
      },
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
      .then(dbUserData => {
        if (!dbUserData) {  // Handel an invalid/nonexistent id value.
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//////////////////////////////////////////////////////////////////////////////////////////////////
// POST /api/users
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // This is equivalent to:  INSERT INTO users  (username, email, password)  VALUES ("Lernantino", "lernantino@gmail.com", "password1234");

  User.create({
    username: req.body.username,           // these are the "keys" defined in the "user" model.
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  
//////////////////////////////////////////////////////////////////////////////////////////////////
// This is the login route
router.post('/login', (req, res) => {
  // Query operation to validate a user
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user found with that email address!' });
      return;
    }

    // Verify user by comparing passwords.  The database hashed password will be
    // in 'dbUserData', while the plaintext (user entered) password will be in req.body.
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });

  });

});


//////////////////////////////////////////////////////////////////////////////////////////////////
// PUT /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // This is equivalent to:  UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234" WHERE id = 1;

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  // req.body contains the new data for the update, req.params.id indicates exactly where to update
  User.update(req.body, {
    individualHooks: true,          // needed for bcrypt and sequelize to hash a password update.
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Logout routine
router.post('/logout', (req, res) => {

  if (req.session.loggedIn) {
      req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    console.log( "Cannot logout, no session logged in.");
    res.status(404).end();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;