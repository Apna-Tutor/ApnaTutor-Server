require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

mongoose.connect(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology: true}, (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("Connected")
    }
})

app.use(cors());
app.use(express.json({limit: 1073741824})); // 1GB 
app.use(express.urlencoded({ extended: true }));

app.use('/users', require('./Routes/users'));
app.use('/courses', require('./Routes/courses'));
app.use('/upload', require('./Routes/uploader'));

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT)
});