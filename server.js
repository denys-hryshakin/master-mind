const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require("passport");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Route Imports
const usersRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// API REQUEST
app.use(cors());
app.get('/api', (req, res) => {
    res.send('Welcome to the API of the project "MasterMind"!');
})
app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)

// DB Config
const db = require("./config/keys").mongoURI;

// MongoDb connection
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("")
        console.log("=======================================")
        console.log("MongoDB successfully connected")
        app.listen(4000, () => {
            console.log('Hello! Server is listening on port 4000');
            console.log("=======================================")
            console.log("")

        });
    })
    .catch(err => console.log(err));