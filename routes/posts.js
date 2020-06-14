const express = require('express')
const router = express()
const Post = require('../models/Post')
const User = require('../models/User')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose')
router.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.route('/upload')
    .post(upload.single('imageData'), (req, res) => {
        const newImage = new Post({
            imageData: req.file.path
        });
        newImage.save()
            .then((result) => {
                res.status(200).json(result)
            })

    })

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
router.put("/update/:userId/:id", async (req, res) => {
    try {
        // Form validation
        const { errors, isValid } = validatePostInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const updatePost = await Post.findByIdAndUpdate({ _id: req.params.id },
            {
                title: req.body.title,
                userId: req.params.userId,
                text: req.body.text,

            },
            { new: true }
        )
        res.status(200).json({ resultCode: 0, message: "OK", title: updatePost.title, text: updatePost.text, userId: updatePost.userId })
    } catch (error) {
        res.status(500).json({ resultCode: 1, message: "ERROR", error })
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ resultCode: 0, message: "Post deleted!" })
    } catch (error) {
        res.status(500).json({ resultCode: 1, message: "Error", error })
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