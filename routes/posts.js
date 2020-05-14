const express = require('express')
const router = express()
const Post = require('../models/Post')
const User = require('../models/User')
const cors = require('cors')
const mongoose = require('mongoose')
router.use(cors())

// Load input validation
const validatePostInput = require("../validation/post");

router.post("/newPost/:userId", (req, res) => {
    // Form validation
    const { errors, isValid } = validatePostInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findOne({ userId: req.params.userId })
        .then(post => {
                const newPost = new Post({
                    title: req.body.title,
                    text: req.body.text,
                    userId: req.params.userId
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

router.get('/userPosts', (req, res) => {
    Post.find()
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

router.get('/userPosts/:userId', async(req, res)=>{
    try {
        let posts = await Post.find({userId: req.params.userId})
        .populate('userId', '_id first_name login')
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