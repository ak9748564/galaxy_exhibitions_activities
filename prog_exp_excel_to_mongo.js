var mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect("mongodb+srv://akge77926:galaxy_exhibitions@cluster1.nnmlclt.mongodb.net/galaxy_exhibitions").then(res=>console.log("mongodb connected")).catch(err=>console.log(err));

const express = require('express');
const app = express();
const allowedOrigin=['http://localhost:3000/']
app.use(cors(allowedOrigin));

var activityRoute = require('./routes/activityRoute');

app.use('/',activityRoute)

app.listen(4000,()=>{
    console.log('programming experience, server is running on port 4000');
})