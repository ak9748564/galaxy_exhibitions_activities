var Activity = require('./../models/activityModel');
var Contact = require('./../models/contactModel');

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
        const currentPage = req.query.currentPage || 0;
        const itemsPerPage = req.query.itemsPerPage || 100;
        const searchText = req.query.searchText;
        const zone = req.query.zone;
        const licenseType = req.query.licenseType;
        const isSpecial = req.query.isSpecial;
        const riskClass = req.query.riskClass;
        const compRR = req.query.compRR;
        const activityGroup = req.query.activityGroup;

        
        const response = await Activity.find({
            "$or":[
                { "Activity Master: Activity Master Number": {$regex:searchText} },
                { "Zone": {$regex:searchText} },
                { "Activity Code": {$regex:searchText} },
                { "Activity Name": {$regex:searchText} },
                { "Status": {$regex:searchText} },
                { "Minimum Share Capital": {$regex:searchText} },
                { "License Type": {$regex:searchText} },
                { "Is Not Allowed for Coworking(ESR)": {$regex:searchText} },
                { "RAKEZ HSE Risk Classification": {$regex:searchText} },
                { "Compliance Risk Rating": {$regex:searchText} },
                { "Is Special": {$regex:searchText} },
                { "Activity Price": {$regex:searchText} },
                { "Activity Group": {$regex:searchText} },
                { "Segment Name English": {$regex:searchText} },
                { "Description": {$regex:searchText} },
                { "Qualification Requirement": {$regex:searchText} },
                { "Documents Required": {$regex:searchText} }
            ],
            {
            "Status": "Active",
            "Zone": zone,
            "License Type": licenseType,
            "Is Special": isSpecial,
            "RAKEZ HSE Risk Classification": riskClass,
            "Compliance Risk Rating": compRR,
            "Activity Group": activityGroup
            }
        })
        // .where('Status').equals('Active')
        // .where('Zone').equals(zone)
        // .where('License Type').equals(licenseType)
        // .where('Is Special').equals(isSpecial)
        // .where('RAKEZ HSE Risk Classification').equals(riskClass)
        // .where('Compliance Risk Rating').equals(compRR)
        // .where('Activity Group').equals(activityGroup)
        .skip(currentPage*itemsPerPage).limit(itemsPerPage);
        const recordCount = await Activity.find({
            "$or":[
                { "Activity Master: Activity Master Number": {$regex:searchText} },
                { "Zone": {$regex:searchText} },
                { "Activity Code": {$regex:searchText} },
                { "Activity Name": {$regex:searchText} },
                { "Status": {$regex:searchText} },
                { "Minimum Share Capital": {$regex:searchText} },
                { "License Type": {$regex:searchText} },
                { "Is Not Allowed for Coworking(ESR)": {$regex:searchText} },
                { "RAKEZ HSE Risk Classification": {$regex:searchText} },
                { "Compliance Risk Rating": {$regex:searchText} },
                { "Is Special": {$regex:searchText} },
                { "Activity Price": {$regex:searchText} },
                { "Activity Group": {$regex:searchText} },
                { "Segment Name English": {$regex:searchText} },
                { "Description": {$regex:searchText} },
                { "Qualification Requirement": {$regex:searchText} },
                { "Documents Required": {$regex:searchText} },
            ]
        }).where('Status').equals('Active').countDocuments();
        // console.log(response)
        res.send({status:200,message:'activities got successfully',data:{response,recordCount}})
    } catch (error) {
        res.send({message:error.message})
    }
}



const getActivitiesGroup = async(req,res) => {
    try {
        const response = await Activity.find({},{'Activity Group':1}).where('Status').equals('Active');
        // console.log(response)
        res.send({status:200,message:'activities groups got successfully',data:response})
    } catch (error) {
        res.send({message:error.message})
    }
}



const contact = async(req,res) => {
    try {
        const {name,email,phone,message,activity}=req.body
        const saveuser= new Contact({
            name,
            email,
            phone,
            message,
            activity
        })

        try{
            await saveuser.save();
            res.status(200).json({message:"Enquiry Sent Successfully"})
        }
        catch(error){
            res.status(400).json({message:"Enquiry failed", error:error.message})
        }
        
        // let contactData = {
        //     name:req.body.name,
        //     email:req.body.email,
        //     phone:req.body.phone,
        //     message:req.body.message,
        //     activity:req.body.activity
        // };
        //    const res = await Contact.insert(contactData);
        // res.send({status:200,success:true,message:'Enquiry Sent Successfully'})        
    } catch (error) {
        res.send({status:400,success:false,message:error.message})
    }   
}

module.exports = { importActivity, getActivities, getActivitiesGroup, contact }
