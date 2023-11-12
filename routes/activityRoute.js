const express = require('express');
const activity = express.Router();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const Contact=require("./../models/contactModel")

activity.use(bodyParser.urlencoded({extended:true}));
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
activity.post('/contact', async (req,res) => {
    try {
        console.log(req.body);
        const {name,email,phone,message,activity}=req.body
        const saveuser= new Contact({
            name,
            email,
            phone,
            message,
            activity
        })
        console.log(saveuser)
          const dataex=  await saveuser.save();
        // console.log("data daved :" dataex);
            res.status(200).json({message:"Enquiry Sent Successfully"})
    
    } catch (error) {
        res.send({status:400,success:false,message:error.message})
    }   
});
activity.get('/getActivities',activityController.getActivities)
activity.get('/getActivitiesGroup',activityController.getActivitiesGroup)

module.exports = activity;
