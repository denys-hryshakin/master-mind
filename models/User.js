const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    followed: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        required: true,
        default: "This is your status!"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', UserSchema)