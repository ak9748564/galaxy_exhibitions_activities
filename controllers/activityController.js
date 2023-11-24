var Activity = require('./../models/activityModel');
var Contact = require('./../models/contactModel');

const activityGroups = require('./../controllers/activityGroups')

var csv = require('csvtojson');

const importActivity = async(req,res) => {
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
                { "Activity Master: Activity Master Number": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Zone": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Activity Code": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Activity Name": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Status": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Minimum Share Capital": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "License Type": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Is Not Allowed for Coworking(ESR)": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "RAKEZ HSE Risk Classification": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Compliance Risk Rating": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Is Special": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Activity Price": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Activity Group": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Segment Name English": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Description": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Qualification Requirement": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Documents Required": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } }
            ],
            "Status": "Active",
            "Zone": zone || ['','Freezone','Non-Freezone'],
            "License Type": licenseType || ['','Professional','Commercial','Industrial','Educational','Services','Freelance Permit','Media','Individual / Professional','E-Commerce','General Trading'],
            "Is Special": isSpecial || ['','Standard','Special'],
            "RAKEZ HSE Risk Classification": riskClass || ['','Low','Medium','High'],
            "Compliance Risk Rating": compRR || ['','Low','High'],
            "Activity Group": activityGroup || activityGroups
        })
        .skip(currentPage*itemsPerPage).limit(itemsPerPage);
        const recordCount = await Activity.find({
            "$or":[
                { "Activity Master: Activity Master Number": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Zone": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Activity Code": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Activity Name": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Status": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Minimum Share Capital": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "License Type": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Is Not Allowed for Coworking(ESR)": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "RAKEZ HSE Risk Classification": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Compliance Risk Rating": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Is Special": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Activity Price": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Activity Group": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Segment Name English": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Description": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Qualification Requirement": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
                { "Documents Required": { $regex: new RegExp("^"+searchText.toLowerCase(),"i") } },
            ],
            "Status": "Active",
            "Zone": zone || ['','Freezone','Non-Freezone'],
            "License Type": licenseType || ['','Professional','Commercial','Industrial','Educational','Services','Freelance Permit','Media','Individual / Professional','E-Commerce','General Trading'],
            "Is Special": isSpecial || ['','Standard','Special'],
            "RAKEZ HSE Risk Classification": riskClass || ['','Low','Medium','High'],
            "Compliance Risk Rating": compRR || ['','Low','High'],
            "Activity Group": activityGroup || activityGroups
        }).countDocuments();
        // console.log(response)
        res.send({status:200,message:'activities got successfully',data:{response,recordCount}})
    } catch (error) {
        res.send({message:error.message})
    }
}



const getActivitiesGroup = async(req,res) => {
    try {
        const response = await Activity.find({},{'Activity Group':1}).where('Status').equals('Active');

        res.send({status:200,message:'activities groups got successfully',data:response})
    } catch (error) {
        res.send({message:error.message})
    }
}



const contact = async(req,res) => {
    try {
        console.log(req);
        const {name,email,phone,message,activity}=req.body
        const contact = new Contact({
            name,
            email,
            phone,
            message,
            activity
        })
        // console.log(saveuser)
          await contact.save();
        // console.log("data daved :" dataex);
            res.status(200).json({message:"Enquiry Sent Successfully"})
    
    } catch (error) {
        res.send({status:400,success:false,message:error.message})
    }     
}

module.exports = { importActivity, getActivities, getActivitiesGroup, contact }
