const DoctorModel = require('../models/DoctorModel')


const doctor=(req,res)=>{
    DoctorModel.find((err, data)=>{
        if(!err){
            res.render('./admin/doctor' , {
                'title' : 'Doctor Page',
                doctors : data,
            })
        }
    })
}


const addDoctor = (req,res)=>{
    const doctordata = new DoctorModel({
        name : req.body.name,
        specialist : req.body.specialist,
        experience : req.body.experience,
        qualification : req.body.qualification,
        email : req.body.email,
    })
    doctordata.save().then(data=>{
        res.redirect('./doctor')
        console.log(data);
    }).catch(err=>{
        res.redirect('./doctor')
        console.log(err);
    })
}

module.exports = {
    doctor,
    addDoctor
}