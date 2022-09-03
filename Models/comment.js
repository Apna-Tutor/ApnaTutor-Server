module.exports = require('mongoose').Schema({
    userId: {type: String, required: true},
    comment: {type: String, required: true},
    date: {type: Number, required: true},
    likedBy: {type: Array, of: String, required: false},
    replies: {type: Array, of: this, required: false}, // check
});