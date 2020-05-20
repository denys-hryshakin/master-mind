const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
    // following: [
    //     {
    //         user: {
    //             type: Schema.ObjectId,
    //             ref: 'User'
    //         }
    //     }
    // ],
    // followers: [
    //     {
    //         user: {
    //             type: Schema.ObjectId,
    //             ref: 'User'
    //         }
    //     }
    // ],
    status: {
        type: String,
        required: true,
        default: "This is your status!"
    },
    date: {
        type: Date,
        default: Date.now
    },
    userImg: {
        type: Buffer,
        contentType: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
})


module.exports = mongoose.model('User', UserSchema)