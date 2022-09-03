const mongoose = require('mongoose');
const Video = require('./video');

module.exports = mongoose.model('Course', mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
    videos: {type: Array, of: Video, required: false},
    followedBy: {type: Array, of: String, required: false},
    leaderBoard: {type: Map, of: Number, required: false},
}));