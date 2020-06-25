const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true, default: "---" },
    date: { type: Date, default: Date.now },
    userImg: { type: String, default: "---" },
    country: { type: String, default: "---" },
    city: { type: String, default: "---" },
    geoData: {
        address: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        area: { type: String, default: null },
        lat: { type: String, default: null },
        lng: { type: String, default: null },
    },
});

module.exports = mongoose.model('User', UserSchema);