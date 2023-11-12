var mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    'name':{
        type: String
    },
    'email':{
        type: String
    },
    'phone':{
        type: String
    },
    'message':{
        type: String
    },
    'activity':{
        type:String
    },
})

module.exports = mongoose.model('Contact',contactSchema);
