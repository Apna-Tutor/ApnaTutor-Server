module.exports = require('mongoose').Schema({
    question: {type: String, required: true},
    options: {type: Array, of: String, required: true},
    answer: {type: String, required: true},
});