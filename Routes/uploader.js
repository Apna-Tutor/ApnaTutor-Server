const Cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const multer = require('multer');

Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.put('/avatar', multer({storage: multer.memoryStorage()}).single('avatar'), (req, res)=> {
    Cloudinary.uploader.upload({
        resource_type: "auto",
        folder: "ApnaTutor/avatars/",
        public_id: Date.now().toString()
    },(error, result) => {
        if (error) res.status(400).send(error.message);
        else res.status(200).json({url: result.secure_url});
    }).end(req.file.buffer);
});

router.put('/thumbnail', multer({storage: multer.memoryStorage()}).single('thumbnail'), (req, res)=> {
    console.log(req.body);
    console.log(req.file);
    console.log(req.file.buffer);
    console.log(req);
    
    Cloudinary.uploader.upload({
        resource_type: "auto",
        folder: "ApnaTutor/thumbnails/",
        public_id: Date.now().toString()
    },(error, result) => {
        if (error) res.status(400).send(error.message);
        else res.status(200).json({url: result.secure_url});
    }).end(req.file.buffer);
});

router.put('/video', multer({storage: multer.memoryStorage()}).single('video'), (req, res)=> {
    Cloudinary.uploader.upload({
        resource_type: "auto",
        folder: "ApnaTutor/videos/",
        public_id: Date.now().toString()
    },(error, result) => {
        if (error) res.status(400).send(error.message);
        else res.status(200).json({url: result.secure_url});
    }).end(req.file.buffer);
});

module.exports = router;