const DoctorModel = require('../models/DoctorModel')


const doctor=(req,res)=>{
    res.render("./admin/doctor")
}

const addDoctor = (req,res)=>{
    const doctordata = new DoctorModel({
        name : req.body.name,
        specialist : req.body.specialist,
        experience : req.body.experience,
    })
    doctordata.save().then(data=>{
        res.redirect('./admin/doctor')
        console.log(data);
    }).catch(err=>{
        res.redirect('./admin/doctor')
        console.log(err);
    })
}

module.exports = {
    doctor
}