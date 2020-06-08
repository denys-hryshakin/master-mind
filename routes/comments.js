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

router.post("/new/:userId/:postId", (req, res)=> {
    Comment.findOne()
        .then(comment => {
            const newComment = new Comment({
                text: req.body.text,
                userId: req.params.userId,
                postId: req.params.postId
            });
            newComment
                .save()
                .then(comment => {
                    res.status(200).json(comment);
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        })
})

module.exports = router;