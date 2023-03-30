const DoctorModel = require('../models/DoctorModel')


const doctor=(req,res)=>{
    DoctorModel.find((err, data)=>{
        if(!err){
            res.render('./admin/doctor' , {
                'title' : 'Admin | Doctor',
                doctors : data,
                data:req.admin,
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
        DoctorImage:req.file.filename,
    })
    doctordata.save().then(data=>{
        res.redirect('/admin/doctor')
        console.log(data);
    }).catch(err=>{
        res.redirect('/admin/doctor')
        console.log(err);
    })
}

const activeDoctor= (req, res) => {
    const did=req.params.id;
    DoctorModel.findByIdAndUpdate(did, {
        status: true
    }).then(result => {
        console.log("Doctor Activeted...");
        res.redirect("/admin/doctor");
    }).catch(err => {
        console.log(err);
    })
}


const deActiveDoctor = (req, res) => {
    const did=req.params.id;
    DoctorModel.findByIdAndUpdate(did, {
        status: false
    }).then(result => {
        console.log("Doctor Deactiveted...");
        res.redirect("/admin/doctor");
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {
    doctor,
    addDoctor,
    activeDoctor, deActiveDoctor
}