const express = require('express')
const router = express()
const User = require('../models/User')
const cors = require('cors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
router.use(cors())

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const { route } = require('./posts');

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
        name: req.body.name,
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
          name: user.name,
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
router.get('/pagination', async (req, res) => {
  try {
    const users = await User.find()
    const page = req.query.page;
    const count = req.query.count;
    const startIndex = (page - 1) * count;
    const endIndex = page * count;
    const resultsUsers = users.slice(startIndex, endIndex);
    res.status(200).json({ items: resultsUsers, totalCount: users.length })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({ items: users, totalCount: users.length });
  } catch (error) {
    res.status(500).json(error);
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

router.put('/profile/:userId/image', async (req, res) => {
  try {
    let image = await User.findByIdAndUpdate(req.params.userId, { userImg: req.body.userImg }, { new: true })
      .then(res => {
        const updateImage = new User({
          userImg: req.body.userImg
        });
        updateImage
          .save()
      })
  } catch (error) {
    res.status(500).json(error);
  }
})




// Profile settings ///////////////////////////////////////////////////////////////////////////////


// STATUS /////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile/status/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ resultCode: 0, message: "OK", status: user.status });
  } catch (error) {
    res.json({ resultCode: 1, message: "ERROR", error });
  }
})
router.put('/profile/status/:userId', async (req, res) => {
  try {
    let status = await User.findByIdAndUpdate({ _id: req.params.userId }, { status: req.body.status }, { new: true })
    res.status(200).json({ resultCode: 0, message: "OK", status: status.status })
  } catch (error) {
    res.status(500).json({ resultCode: 1, message: "ERROR", error })
  }
})


// NAME ///////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile/name/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ resultCode: 0, message: "OK", name: user.name });
  } catch (error) {
    res.json({ resultCode: 1, message: "ERROR", error });
  }
})
router.put('/profile/name/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.userId }, { name: req.body.name }, { new: true })
    res.status(200).json({ resultCode: 0, message: "OK", name: user.name })
  } catch (error) {
    res.status(500).json({ resultCode: 1, message: "ERROR", error })
  }
})


// SURNAME ////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile/surname/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ resultCode: 0, message: "OK", surname: user.surname });
  } catch (error) {
    res.json({ resultCode: 1, message: "ERROR", error });
  }
})
router.put('/profile/surname/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.userId }, { surname: req.body.surname }, { new: true })
    res.status(200).json({ resultCode: 0, message: "OK", surname: user.surname })
  } catch (error) {
    res.status(500).json({ resultCode: 1, message: "ERROR", error })
  }
})


// CITY ////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile/city/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ resultCode: 0, message: "OK", city: user.city });
  } catch (error) {
    res.json({ resultCode: 1, message: "ERROR", error });
  }
})
router.put('/profile/city/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.userId }, { city: req.body.city }, { new: true })
    res.status(200).json({ resultCode: 0, message: "OK", city: user.city })
  } catch (error) {
    res.status(500).json({ resultCode: 1, message: "ERROR", error })
  }
})


// COUNTRY ////////////////////////////////////////////////////////////////////////////////////////
router.get('/profile/country/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ resultCode: 0, message: "OK", country: user.country });
  } catch (error) {
    res.json({ resultCode: 1, message: "ERROR", error });
  }
})
router.put('/profile/country/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.userId }, { country: req.body.country }, { new: true })
    res.status(200).json({ resultCode: 0, message: "OK", country: user.country })
  } catch (error) {
    res.status(500).json({ resultCode: 1, message: "ERROR", error })
  }
})

// GEOLOCATION ////////////////////////////////////////////////////////////////////////////////////////
router.put('/geolocation/address/:userId', async (req, res) => {
  try {
    const geoData = await User.findByIdAndUpdate({ _id: req.params.userId },
      {
        geoData: {
          address: req.body.address,
          city: req.body.city,
          area: req.body.area,
          state: req.body.state,
          lat: req.body.lat,
          lng: req.body.lng
        }
      },
      { new: true }
    )
    res.status(200).json({ resultCode: 0, message: "OK", geoData: geoData.geoData })
  } catch (error) {
    res.status(500).json({ resultCode: 1, message: "ERROR", error })
  }
})


// ADDRESS ////////////////////////////////////////////////////////////////////////////////////////
router.get('/geolocation/address/:userId', async (req, res) => {
  try {
    const address = await User.findById(req.params.userId, 'geoData')
    res.status(200).json({ resultCode: 0, message: "OK", data: address })
  } catch (error) {
    res.status(500).json({ resultCode: 1, message: "ERROR", error })
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