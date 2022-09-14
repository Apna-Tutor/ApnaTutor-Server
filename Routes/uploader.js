const Cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const multer = require('multer');

Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

router.put('/avatar', multer({storage: multer.memoryStorage(), limits: {fileSize: 104857600}}).single('avatar'), (req, res)=> {
    Cloudinary.uploader.upload_stream({
        resource_type: "auto",
        folder: "ApnaTutor/avatars",
        public_id: Date.now().toString()
    },(error, result) => {
        if (error) res.status(400).send(error.message);
        else res.status(200).send(result.secure_url);
    }).end(req.file.buffer);
});

router.put('/thumbnail', multer({storage: multer.memoryStorage(), limits: {fileSize: 104857600}}).single('thumbnail'), (req, res)=> {
    Cloudinary.uploader.upload_stream({
        resource_type: "auto",
        folder: "ApnaTutor/thumbnails",
        public_id: Date.now().toString()
    },(error, result) => {
        if (error) res.status(400).send(error.message);
        else res.status(200).send(result.secure_url);
    }).end(req.file.buffer);
});

router.put('/video', multer({storage: multer.memoryStorage(), limits: {fileSize: 10737418240}}).single('video'), (req, res)=> {
    Cloudinary.uploader.upload_stream({
        resource_type: "auto",
        folder: "ApnaTutor/videos",
        public_id: Date.now().toString()
    },(error, result) => {
        if (error) res.status(400).send(error.message);
        else res.status(200).send(result.secure_url);
    }).end(req.file.buffer);
});

module.exports = router;