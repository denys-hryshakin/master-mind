const express = require('express')
const router = express()
const Comment = require('../models/Comment')
const User = require('../models/User')
const cors = require('cors')
const keys = require("../config/keys");
router.use(cors());

router.get("/:postId", async (req, res) => {
    try {
        let comments = await Comment.find({ postId: req.params.postId })
            .populate('userId', '_id name surname login email')
            .populate('postId', '_id title text')
            .sort('-date')
        res.status(200).json({
            comments: comments,
            totalCount: comments.length
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/new/:userId/:postId", async (req, res) => {
    try {
        let comments = await Comment.find({ postId: req.params.postId })
        const newComment = new Comment({
            text: req.body.text,
            userId: req.params.userId,
            postId: req.params.postId
        });
        newComment
            .save()
        res.status(200).json({ result: 0, message: "OK", comment: comments });
    } catch (error) {
        res.status(500).json({ result: 1, message: "Error", error })
    }
})

module.exports = router;