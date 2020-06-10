const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: {
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
        default: "Double click to update status!"
    },
    date: {
        type: Date,
        default: Date.now
    },
    userImg: {
        type: String,
        default: "none"
    },
    country: {
        type: String,
        default: "Double click to update country!"
    },
    city: {
        type: String,
        default: "Double click to update city!"
    },
    geoData: {
        address: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        area: {
            type: String,
            default: null
        },
        lat: {
            type: String,
            default: null
        },
        lng: {
            type: String,
            default: null
        },
    },
})


module.exports = mongoose.model('User', UserSchema)