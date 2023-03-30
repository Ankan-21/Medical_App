const DoctorModel=require('../models/DoctorModel');

const Cardiologist=(req,res)=>{
    DoctorModel.aggregate([{$match:{specialist:"cardiologist"}}]).save().then(result=>{
        res.redirect('./department',{
            
        })
    })
}


module.exports={
    Cardiologist,
}