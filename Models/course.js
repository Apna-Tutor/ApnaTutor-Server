const mongoose = require('mongoose');

module.exports = mongoose.model('Course', mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: false},
    thumbnail: {type: String, required: true},
    videos: {type: Array, of: String, required: false},
    followedBy: {type: Array, of: String, required: false},
}));