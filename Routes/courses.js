const express = require('express');
const router = express.Router();
const Course = require('../Models/course');

// Course routes
router.get('/', (req, res)=> {
    Course.findById(req.query.course).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.get('/all', (req, res)=> {
    Course.find().then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.get('/in', (req, res)=> {
    Course.find({_id: {$in: req.body.courses}}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.get('/followed', (req, res)=> {
    Course.find({followedBy: req.query.user}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.get('/uploaded', (req, res)=> {
    Course.find({author: req.query.author}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.post('/add/course', (req, res)=> {
    new Course(req.body).save().then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.patch('/update', (req, res)=> {
    Course.findByIdAndUpdate(req.query.course, req.body, {new: true}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.delete('/delete', (req, res)=> {
    Course.findByIdAndDelete(req.query.course).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Video routes
router.post('/add/video', (req, res)=> {
    Course.findByIdAndUpdate(req.query.course, {$push: {videos: req.body}}, {new: true}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Comment routes
router.post('/add/comment', (req, res)=> {
    Course.findByIdAndUpdate(req.query.course, {$push: {"videos.$[v].comments": req.body}}, {arrayFilters:[{"v._id": req.query.video}], new: true}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Quiz routes
router.post('/add/quiz', (req, res)=> {
    Course.findByIdAndUpdate(req.query.course, {$push: {"videos.$[v].quiz": {$each: [req.body]}}}, {arrayFilters:[{"v._id": req.query.video}], new: true}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// Notes routes
router.post('/add/notes', (req, res)=> {
    Course.findByIdAndUpdate(req.query.course, {$push: {"videos.$[v].notes": {$each: [req.body]}}}, {arrayFilters:[{"v._id": req.query.video}], new: true}).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

module.exports = router;