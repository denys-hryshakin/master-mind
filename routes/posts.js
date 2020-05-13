const express = require('express')
const router = express()
const Post = require('../models/Post')
const User = require('../models/User')
const cors = require('cors')
const mongoose = require('mongoose')
router.use(cors())

// Load input validation
const validatePostInput = require("../validation/post");

router.post("/newPost", (req, res) => {
    // Form validation
    const { errors, isValid } = validatePostInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ title: req.body.title })
        .then(post => {
            if (post) {
                return res.status(400).json({ title: "Post with this title already exists" });
            } else {
                const newPost = new Post({
                    title: req.body.title,
                    text: req.body.text,
                    userId: req.body.userId
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
            }
        });
});

router.get('/userPosts/:userId', (req, res) => {
    Post.find({userId: req.user._id})
        .populate('userId', ('_id first_name login'))
        .then(posts => {
            res.status(200).json({
                posts: posts.map(post => {
                    return {
                        _id: post._id,
                        title: post.title,
                        text: post.text,
                        userId: post.userId
                    }
                }),
                totalCount: posts.length
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;