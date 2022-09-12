const express = require('express');
const course = require('../Models/course');
const router = express.Router();
const Course = require('../Models/course');
const Video = require('../Models/video');

router.get('/', (req, res) => {
    Video.findById(req.query.video).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.get('/all', (req, res) => {
    Video.find().then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/in', (req, res) => {
    console.log(req);
    console.log(req.body);
    console.log('vdos',req.body.videos);
    Video.find({ _id: { $in: req.body.videos } }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
        console.log(error);
    });
});

router.post('/add', (req, res) => {
    new Video(req.body).save().then((video) => {
        Course.findByIdAndUpdate(req.query.course, { $push: { videos: video._id } }, { new: true }).then((course) => {
            res.status(200).json(video);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/add-view', (req, res) => {
    Video.findByIdAndUpdate(req.query.video, { $push: { viewedBy: req.body.user } }, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/add-like', (req, res) => {
    Video.findByIdAndUpdate(req.query.video, { $push: { likedBy: req.body.user } }, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/remove-like', (req, res) => {
    Video.findByIdAndUpdate(req.query.video, { $pull: { likedBy: req.body.user } }, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/add-notes', (req, res) => {
    Video.findByIdAndUpdate(req.query.video, { $push: { notes: req.body } }, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.post('/remove-notes', (req, res) => {
    Video.findByIdAndUpdate(req.query.video, { $pull: { notes: { _id: req.query.note } } }, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.patch('/update', (req, res) => {
    Video.findByIdAndUpdate(req.query.video, req.body, { new: true }).then((value) => {
        res.status(200).json(value);
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

router.delete('/delete', (req, res) => {
    Video.findByIdAndDelete(req.query.video).then((video) => {
        Course.findByIdAndUpdate(req.query.course, { $pull: { videos: video._id } }, { new: true }).then((course) => {
            res.status(200).json(video);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

module.exports = router;