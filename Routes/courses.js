const express = require('express');
const router = express.Router();
const Course = require('../Models/course');
const Video = require('../Models/video');
const Comment = require('../Models/comment');

router.get('/', (req, res) => {
    Course.findById(req.query.course).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.get('/all', (req, res) => {
    Course.find().then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/in', (req, res) => {
    Course.find({ _id: { $in: req.body.courses } }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.get('/followed', (req, res) => {
    Course.find({ followedBy: req.query.user }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.get('/uploaded', (req, res) => {
    Course.find({ author: req.query.author }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/add', (req, res) => {
    new Course(req.body).save().then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/add-follower', (req, res) => {
    Course.findByIdAndUpdate(req.query.course, { $push: { followedBy: req.body.user } }, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/remove-follower', (req, res) => {
    Course.findByIdAndUpdate(req.query.course, { $pull: { followedBy: { _id: req.body.user } } }, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.patch('/update', (req, res) => {
    Course.findByIdAndUpdate(req.query.course, req.body, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.delete('/delete', (req, res) => {
    Course.findByIdAndDelete(req.query.course).then((course) => {
        Video.deleteMany({ _id: { $in: course.videos } }).then((videos) => {
            const commentIds = [...videos.map(v => v.comments)];
            Comment.deleteMany({ _id: { $in: commentIds.flat() } }).then((comments) => {
                console.log("deleted comments: ", comments);
            }).catch((error) => {
                console.log("deleted comments: ", error);
            });
            console.log("deleted videos: ", videos);
        }).catch((error) => {
            console.log("deleted videos: ", error);
        });
        res.status(200).json(course);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

module.exports = router;