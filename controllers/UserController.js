const UserModel = require('../models/UserModel');
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
    res.render("./user/doctor")
}
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
    home, about, contact, department, doctor, blog, blog_details,
    register, CreateRegister,
}