const express = require('express')
const router = express()
const Post = require('../models/Post')
const User = require('../models/User')
const cors = require('cors')
const mongoose = require('mongoose')
router.use(cors())

// Load input validation
const validatePostInput = require("../validation/post");

router.post("/new", (req, res) => {
    // Form validation
    const { errors, isValid } = validatePostInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findOne()
        .then(post => {
                const newPost = new Post({
                    title: req.body.title,
                    userId: req.body.userId,
                    text: req.body.text,
                });
                newPost
                    .save()
                    .then(post => {
                        console.log(post);
                        res.status(201).json(post);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
        });
});

router.get('/userPosts/:userId', async (req, res) => {
    try {
        let posts = await Post.find({ userId: req.params.userId })
            .populate('userId', '_id first_name email')
        res.json({
            posts: posts,
            totalCount: posts.length
        })
    } catch (error) {
        return res.json({
            error: error
        })
    }
})


module.exports = router;