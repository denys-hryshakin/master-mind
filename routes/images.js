const express = require('express')
const router = express()
const Image = require('../models/Image')
const User = require('../models/User')
const cors = require('cors')
const mongoose = require('mongoose')
router.use(cors())
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        // rejects storing a file
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.route('/upload/:userId')
    .post(upload.single('imageData'), (req, res, next) => {
        console.log(req.body)
        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.file.path,
            userId: req.params.userId
        });

        newImage.save()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    succes: true,
                    document: result
                });
            })
            .catch(err => next(err))
    });

router.get('/:userId', async (req, res) => {
    try {
        let avatar = await Image.find({ userId: req.params.userId })
            .populate('userId', '_id first_name email')
        res.json(avatar)
    } catch (error) {
        return res.json(error)
    }
})

module.exports = router;