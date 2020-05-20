const express = require('express')
const router = express()
const User = require('../models/User')
const Avatar = require('../models/Image')
const cors = require('cors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
router.use(cors())

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        first_name: req.body.first_name,
        surname: req.body.surname,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          first_name: user.first_name,
          surname: user.surname,
          login: user.login,
          email: user.email
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400 // 24 hours  //31556926 - 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "• Password is incorrect" });
      }
    });
  });
});

// GET ALL THE USERS
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    const page = req.query.page;
    const count = req.query.count;
    const startIndex = (page - 1) * count;
    const endIndex = page * count;
    const resultsUsers = users.slice(startIndex, endIndex);
    res.json({ items: resultsUsers, totalCount: users.length })
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({ profile: user })
  } catch (error) {
    res.json({ message: error })
  }
})

router.post('/edit/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id)
    .then(user => {
      const updateUser = new User({
        first_name: req.body.first_name,
        surname: req.body.surname,
        email: req.body.email,
        login: req.body.login
      });
      updateUser
          .save()
          .then(user => {
              console.log(user);
              res.status(201).json(user);
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({
                  error: err
              });
          });
});
  } catch (error) {
    res.json({ message: error })
  }
})

// router.post("/user/:user_id/follow-user", (req, res) => {

//   // check if the requested user and :user_id is same if same then 

//   if (req.user.id === req.params.user_id) {
//     return res.status(400).json({ alreadyfollow: "You cannot follow yourself" })
//   }

//   User.findById(req.params.user_id)
//     .then(user => {

//       // check if the requested user is already in follower list of other user then 

//       if (user.followers.filter(follower =>
//         follower.user.toString() === req.user.id).length > 0) {
//         return res.status(400).json({ alreadyfollow: "You already followed the user" })
//       }

//       user.followers.unshift({ user: req.user.id });
//       user.save()
//       User.findOne({ email: req.user.email })
//         .then(user => {
//           user.following.unshift({ user: req.params.user_id });
//           user.save().then(user => res.json(user))
//         })
//         .catch(err => res.status(404).json({ alradyfollow: "you already followed the user" }))
//     })
// })

// router.get('/api/portals', (req, res) => {
//   connection.query(SELECT_ALL_PORTALS, (err, portals) => {
//     if (err) {
//       return res.send(err);
//     } else {
//       return res.json({
//         portals: portals
//       });
//     }
//   })
// })

module.exports = router;