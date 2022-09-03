const Comment = require('./comment');
const Note = require('./note');
const Quiz = require('./quiz');

module.exports = require('mongoose').Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
    videoUrl: {type: String, required: true},
    date: {type: Number, required: true},
    likedBy: {type: Array, of: String, required: false},
    viewedBy: {type: Array, of: String, required: false},
    comments: {type: Array, of: Comment, required: false},
    notes: {type: Array, of: Note, required: false},
    quiz: {type: Array, of: Quiz, required: false},
});