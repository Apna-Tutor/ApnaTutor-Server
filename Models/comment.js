const mongoose = require('mongoose');

const SubComment = mongoose.Schema({
    userId: {type: String, required: true},
    comment: {type: String, required: true},
    date: {type: Number, required: true},
    likedBy: {type: Array, of: String, required: false},
});

module.exports = mongoose.model('Comment', mongoose.Schema({
    userId: {type: String, required: true},
    comment: {type: String, required: true},
    date: {type: Number, required: true},
    likedBy: {type: Array, of: String, required: false},
    replies: {type: Array, of: SubComment, required: false},
}));