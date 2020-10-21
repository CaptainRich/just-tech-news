

const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

//////////////////////////////////////////////////////////////////////////////////////////////////
// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: { exclude: ['password'] },
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
    })                            // equivalent to   "SELECT * FROM users"
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//////////////////////////////////////////////////////////////////////////////////////////////////
// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({                            // equivalent to    "SELECT * FROM users WHERE id =1"
      attributes: { exclude: ['password'] },
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

//////////////////////////////////////////////////////////////////////////////////////////////////
// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // This is equivalent to:  INSERT INTO users  (username, email, password)  VALUES ("Lernantino", "lernantino@gmail.com", "password1234");

    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => res.json(dbUserData))
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
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    // Verify user by comparing passwords.  The database hashed password will be
    // in 'dbUserData', while the plaintext (user entered) password will be in req.body.
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    res.json({ user: dbUserData, message: 'You are now logged in!' });

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
    individualHooks: true,          // needed for bcrypt and sequelize
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



module.exports = router;