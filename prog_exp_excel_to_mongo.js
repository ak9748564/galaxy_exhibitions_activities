var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://akge77926:galaxy_exhibitions@cluster1.nnmlclt.mongodb.net/galaxy_exhibitions").then(res=>console.log("mongodb connected")).catch(err=>console.log(err));

const cors = require('cors');
const express = require('express');
const app = express();
const allowedOrigin=["*",'https://activities-edes.vercel.app/']
app.use(cors())

var activityRoute = require('./routes/activityRoute');

app.use('/',activityRoute)

app.listen(4000,()=>{
    console.log('programming experience, server is running on port 4000');
})
