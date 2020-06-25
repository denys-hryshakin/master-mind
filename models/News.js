const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    category: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', NewsSchema);