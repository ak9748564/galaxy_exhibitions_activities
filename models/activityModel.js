var mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    'Activity Master: Activity Master Number':{
        type: String
    },
    'Zone':{
        type: String
    },
    'Activity Code':{
        type: String
    },
    'Activity Name':{
        type: String
    },
    'Activity Name Arabic':{
        type:String
    },
    'Status':{
        type:String
    },
    'Minimum Share Capital':{
        type:String
    },
    'License Type':{
        type:String
    },
    'License Type Arabic':{
        type:String
    },
    'Is Not Allowed For Coworking (ESR)':{
        type:String
    },
    'RAKEZ HSE Risk Classification':{
        type:String
    },
    'Compliance Risk Rating':{
        type:String
    },
    'Is Special':{
        type:String
    },
    'Activity Price':{
        type:String
    },
    'Activity Group':{
        type:String
    },
    'Activity Group Arabic':{
        type:String
    },
    'Segment Name English':{
        type:String
    },
    'Segment Name Arabic':{
        type:String
    },
    'Description':{
        type:String
    },
    'Description Arabic':{
        type:String
    },
    'Qualification Requirement':{
        type:String
    },
    'Documents Required':{
        type:String
    }
})

module.exports = mongoose.model('Activity',activitySchema);