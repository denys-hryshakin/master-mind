const express = require('express')
const router = express()
const Post = require('../models/Post')
const User = require('../models/User')
const cors = require('cors')
const mongoose = require('mongoose')
router.use(cors())

// Load input validation
const validatePostInput = require("../validation/post");

router.post("/new/:userId", (req, res) => {
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
                userId: req.params.userId,
                text: req.body.text,
            });
            newPost
                .save()
                .then(post => {
                    res.status(201).json(post);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});

router.get('/:userId', async (req, res) => {
    try {
        let posts = await Post.find({ userId: req.params.userId })
            .populate('userId', '_id name email login surname')
            .sort('-date')
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
router.post("/update/:userId/:id", (req, res) => {
    // Form validation
    const { errors, isValid } = validatePostInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findByIdAndRemove(req.params.id)
        .then(post => {
            const updatePost = new Post({
                title: req.body.title,
                userId: req.params.userId,
                text: req.body.text,
            });
            updatePost
                .save()
                .then(post => {
                    res.status(201).json(post);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.json({ message: "Post deleted!" })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/userpost/:postId', async (req, res) => {
    try {
        const post = await Post.findById({ _id: req.params.postId })
            .populate('userId', 'name surname login')
        res.json({
            postId: post._id,
            title: post.title,
            text: post.text,
            date: post.date,
            userId: post.userId._id,
            userName: post.userId.name,
            userSurname: post.userId.surname,
            userLogin: post.userId.login
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;