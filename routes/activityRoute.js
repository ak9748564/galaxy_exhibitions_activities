const express = require('express');
const activity = express();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

activity.use(bodyParser());
activity.use(express.static(path.resolve(__dirname,'public')))

var storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname)
    }
})

var upload = multer({storage:storage});

const activityController = require('./../controllers/activityController');

activity.post('/importActivity',upload.single('file'),activityController.importActivity);
activity.post('/contact',activityController.contact);
activity.get('/getActivities',activityController.getActivities)
activity.get('/getActivitiesGroup',activityController.getActivitiesGroup)

module.exports = activity;
