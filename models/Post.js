const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    imageName: {
        type: String,
        default: "none"
    },
    imageData: {
        type: String,
        default: "none"
    }
    
})

module.exports = mongoose.model('Post', PostSchema)