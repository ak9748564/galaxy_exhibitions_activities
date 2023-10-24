var Activity = require('./../models/activityModel');

var csv = require('csvtojson');

const importActivity = async(req,res) => {
    try {
        let activityData = [];
        csv()
        .fromFile(req.file.path)
        .then(res=>{
            console.log(res)
            for(let x = 0; x < res.length; x++ ){
                activityData.push({
                    'Activity Master: Activity Master Number':res[x]['Activity Master: Activity Master Number'],
                    'Zone':res[x]['Zone'],
                    'Activity Code':res[x]['Activity Code'],
                    'Activity Name':res[x]['Activity Name'],
                    'Activity Name Arabic':res[x]['Activity Name Arabic'],
                    'Status':res[x]['Status'],
                    'Minimum Share Capital':res[x]['Minimum Share Capital'],
                    'License Type':res[x]['License Type'],
                    'License Type Arabic':res[x]['License Type Arabic'],
                    'Is Not Allowed For Coworking (ESR)':res[x]['Is Not Allowed For Coworking (ESR)'],
                    'RAKEZ HSE Risk Classification':res[x]['RAKEZ HSE Risk Classification'],
                    'Compliance Risk Rating':res[x]['Compliance Risk Rating'],
                    'Is Special':res[x]['Is Special'],
                    'Activity Price':res[x]['Activity Price'],
                    'Activity Group':res[x]['Activity Group'],
                    'Activity Group Arabic':res[x]['Activity Group Arabic'],
                    'Segment Name English':res[x]['Segment Name English'],
                    'Segment Name Arabic':res[x]['Segment Name Arabic'],
                    'Description':res[x]['Description'],
                    'Description Arabic':res[x]['Description Arabic'],
                    'Qualification Requirement':res[x]['Qualification Requirement'],
                    'Documents Required':res[x]['Documents Required'],
                })
            }
            Activity.insertMany(activityData);
        })
        res.send({status:200,success:true,message:'CSV Imported Successfully'})        
    } catch (error) {
        res.send({status:400,success:false,message:error.message})
    }   
}
const getActivities = async(req,res) => {
    try {
        const response = await Activity.find();
        // console.log(response)
        res.send({status:200,message:'activities got successfully',data:response})
    } catch (error) {
        res.send({message:error.message})
    }
}
module.exports = { importActivity, getActivities }