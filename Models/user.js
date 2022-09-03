const mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required: false},
    password: {type: String, required: true},
    type: {type: String, required: true},
}));