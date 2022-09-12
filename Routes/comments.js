const express = require('express');
const router = express.Router();
const Video = require('../Models/video');
const Comment = require('../Models/comment');

router.get('/', (req, res)=> {
    Comment.findById(req.query.comment).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.get('/all', (req, res)=> {
    Comment.find().then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.get('/in', (req, res)=> {
    Comment.find({_id: {$in: req.body.comments}}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/add', (req, res)=> {
    new Comment(req.body).save().then((comment) => {
        Video.findByIdAndUpdate(req.query.video, {$push: {comments: comment._id}}, {new: true}).then((video) => {
            res.status(200).json(comment);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/add-like', (req, res)=> {
    Comment.findByIdAndUpdate(req.query.comment, {$push: {likedBy: req.body.user}}, {new: true}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/remove-like', (req, res)=> {
    Comment.findByIdAndUpdate(req.query.comment, {$pull: {likedBy: req.body.user}}, {new: true}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/add-reply', (req, res)=> {
    // Comment.findByIdAndUpdate(req.query.comment, {$push: {notes: req.body}}, {new: true}).then((value) => {
    //     res.status(200).json(value);
    // }).catch((error) => {
    //     res.status(400).send(error.message);
    // });
});

router.post('/remove-reply', (req, res)=> {
    // Comment.findByIdAndUpdate(req.query.comment, {$pull: {notes: {_id: req.query.note}}}, {new: true}).then((value) => {
    //     res.status(200).json(value);
    // }).catch((error) => {
    //     res.status(400).send(error.message);
    // });
});

router.patch('/update', (req, res)=> {
    Comment.findByIdAndUpdate(req.query.comment, req.body, {new: true}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.delete('/delete', (req, res)=> {
    Comment.findByIdAndDelete(req.query.comment).then((comment) => {
        Video.findByIdAndUpdate(req.query.video, {$pull: {comments: comment._id}}, {new: true}).then((video) => {
            res.status(200).json(comment);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

module.exports = router;