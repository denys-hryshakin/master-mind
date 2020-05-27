const express = require('express')
const router = express()
const News = require('../models/News')
const cors = require('cors')
const keys = require("../config/keys");
router.use(cors());

router.post('/add/new', (req, res) => {
    News.findOne()
    .then(news => {
            const newNews = new News({
                title: req.body.title,
                text: req.body.text,
                category: req.body.category,
                city: req.body.city,
            });
            newNews
                .save()
                .then(news => {
                    console.log(news);
                    res.status(200).json(news);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
    });
})

router.get('/local/:city', async(req, res) => {
    try {   
        const localNews = await News.find({ city: req.params.city })
            .sort('-date')
        res.status(200).json({
            address: req.params.city,
            news: localNews,
            totalCount: localNews.length
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async(req, res) => {
    try {   
        const news = await News.find()
            .sort('-date')
        res.status(200).json({
            news: news,
            totalCount: news.length
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:category', async(req, res) => {
    try {   
        const categoryNews = await News.find({ category: req.params.category })
            .sort('-date')
        res.status(200).json({
            category: req.params.category,
            news: categoryNews,
            totalCount: categoryNews.length
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;