module.exports = require('mongoose').Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    timeStamp: {type: Number, required: true},
});