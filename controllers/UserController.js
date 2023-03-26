const UserModel = require('../models/UserModel');
const DoctorModel = require('../models/DoctorModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const home = (req, res) => {
    res.render("./user/index")
}
const about = (req, res) => {
    res.render("./user/about")
}
const contact = (req, res) => {
    res.render("./user/contact")
}
const department = (req, res) => {
    res.render("./user/department")
}
const doctor = (req, res) => {
    DoctorModel.find((err, data)=>{
        if(!err){
            res.render('./user/doctor' , {
                'title' : 'Doctor Page',
                doctors : data,
            })
        }
    })
}
const doctor_single = (req, res) => {
    DoctorModel.find({slug:req.params.slug}).then(result=>{
        res.render("./user/doctor-single",{
            singleData:result
        })
    })
    
}


// const doctor_single = (req, res) => {
//     PostModel.find({ slug: req.params.slug }).then(result => {
//         console.log(result);
//         CommentModel.find().populate("post").exec((err, data) => {
//             if (!err) {
//                 console.log(data);
//                 res.render("viewpost", {
//                     displayData: result,
                   
                   
//                 })
//             } else {
//                 console.log(err);
//             }
//         })
//     }).catch(err => {
//         console.log(err);
//     })
// }








const blog = (req, res) => {
    res.render("./user/blog")
}
const blog_details = (req, res) => {
    res.render("./user/blog-details")
}

const register = (req, res) => {
    res.render("./user/register")
}

const CreateRegister = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const User = new UserModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password: hashedPassword
    })
    User.save().then(result => {
        console.log(result, "user register successfully...");
        res.redirect('/')
    }).catch(err => {

        console.log(err);
        res.redirect('/register')
    })
}


module.exports = {
    home, about, contact, department, doctor,doctor_single, blog, blog_details,
    register, CreateRegister,
}