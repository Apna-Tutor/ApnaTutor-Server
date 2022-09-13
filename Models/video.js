const mongoose = require('mongoose');
const Comment = require('./comment');

const Quiz = mongoose.Schema({
    question: {type: String, required: true},
    options: {type: Array, of: String, required: true},
    answer: {type: String, required: true},
});

const Note = mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    timeStamp: {type: Number, required: true},
});

const Rank = mongoose.Schema({
    userId: {type: String, required: true},
    percentage: {type: Number, required: true}
}, {_id: false});

module.exports = mongoose.model('Video', mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    thumbnail: {type: String, required: true},
    videoUrl: {type: String, required: true},
    date: {type: Number, required: true},
    likedBy: {type: Array, of: String, required: false},
    viewedBy: {type: Array, of: String, required: false},
    comments: {type: Array, of: String, required: false},
    notes: {type: Array, of: Note, required: false},
    quiz: {type: Array, of: Quiz, required: false},
    leaderBoard: {type: Array, of: Rank, required: false},
}));