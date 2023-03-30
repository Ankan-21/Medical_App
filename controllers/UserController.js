const UserModel = require('../models/UserModel');
const DoctorModel = require('../models/DoctorModel')
const BlogModel = require('../models/BlogModel');
const AboutModel =require('../models/AboutModel');
const TokenModel = require('../models/TokenModel');
const ContectModel = require('../models/ContactModel');
const CategoryModel = require('../models/CategoryModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const flash = require('connect-flash')

const userAuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        console.log(req.user);
        res.redirect("/login");
    }
}

const home = (req, res) => {
    res.render("./user/index", {
        data: req.user
    })
}
// const about = (req, res) => {
//     res.render("./user/about", {
//         data: req.user
//     })
// }

const about = (req, res) => {
    AboutModel.find((err, data) => {
        if (!err) {
            res.render('./user/about', {
                'title': 'About',
                AboutData: data,
                data: req.user
            })
        }
    })
}

const contact = (req, res) => {
    res.render("./user/contact", {
        data: req.user,
        message : req.flash('message'),
        alert : req.flash('message')
    })
}

const createContact = (req,res)=>{
    const contectdata = new ContectModel({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        subject : req.body.subject,
        message : req.body.message,
    })
    contectdata.save().then(data=>{
        req.flash('message' , 'Thank you for Contect us. we gives our best')
        res.redirect('/contact')
        console.log(data);
    }).catch(err=>{
        req.flash('message' , 'Contect failed....')
        res.redirect('/contact')
    })
}

// const department = (req, res) => {
//     res.render("./user/department", {
//         data: req.user,
//         doctors: data,
//     })
// }

const department = (req, res) => {
    CategoryModel.find((err, data) => {
        if (!err) {
            res.render('./user/department', {
                'title': 'Doctor Page',
                categorys: data,
                data: req.user
            })
        }
    })
}

const Appointment = (req, res) => {
    res.render("./user/apointment", {
        data: req.user
    })
}
const doctor = (req, res) => {
    DoctorModel.find((err, data) => {
        if (!err) {
            res.render('./user/doctor', {
                'title': 'Doctor Page',
                doctors: data,
                data: req.user
            })
        }
    })
}


const blog = (req, res) => {
    BlogModel.find((err, result) => {
        if (!err) {
            res.render('./user/blog', {
                'title': 'Blog Page',
                blogs: result,
                data: req.user
            })
        }
    })
}

const blog_details = (req, res) => {
    res.render("./user/blog-details", {
        data: req.user
    })
}

const register = (req, res) => {
    res.render("./user/register", {
        data: req.user,
        message: req.flash('message'),
    })
}


const CreateRegister = (req, res) => {
    UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err, user) => {
        if (!err) {
            // generate token
            TokenModel({
                _userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            }).save((err, token) => {
                if (!err) {
                    var transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: "rjbag8942@gmail.com",
                            pass: "nzihsbgwmlthcigc"
                        }
                    });
                    var mailOptions = {
                        from: 'no-reply@sd.com',
                        to: user.email,
                        subject: 'Account Verification',
                        text: 'Hello ' + req.body.username + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n'
                    };
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                            console.log("Techniclal Issue...");
                        } else {
                            req.flash("message", "A Verfication Email Sent To Your Mail ID.... Please Verify By Click The Link.... It Will Expire By 24 Hrs...");
                            res.redirect("/register");
                        }
                    });
                } else {
                    console.log("Error When Create Token...", err);
                }
            })

        } else {
            console.log("Error When Create User...", err);
        }
    })
}

const conformation = (req, res) => {
    TokenModel.findOne({ token: req.params.token }, (err, token) => {
        if (!token) {
            console.log("Verification Link May Be Expired :(");
        } else {
            UserModel.findOne({ _id: token._userId, email: req.params.email }, (err, user) => {
                if (!user) {
                    req.flash("message", "User Not Found");
                    res.redirect("/login");
                } else if (user.isVerified) {
                    req.flash("message", "User Already Verified");
                    res.redirect("/login");
                } else {
                    user.isVerified = true;
                    user.save().then(result => {
                        req.flash("message", "Your Account Verified Successfully");
                        res.redirect("/login");
                    }).catch(err => {
                        console.log("Something Went Wrong...", err);
                    })
                }
            })
        }
    })
}

const login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined

    res.render("./user/login-register", {
        title: "Login-Registration",
        data: req.user,
        data1: loginData,
        message: req.flash('message'),
    })
}

const signin = (req, res) => {
    UserModel.findOne({
        email: req.body.email
    }).exec((err, data) => {
        if (data) {
            if (data.isVerified) {
                const hashPassword = data.password;
                if (bcrypt.compareSync(req.body.password, hashPassword)) {
                    const token = jwt.sign({
                        id: data._id,
                        firstname: data.firstname
                    }, "sdsubhajit@2406", { expiresIn: '5m' });
                    res.cookie("token", token);
                    if (req.body.rememberme) {
                        res.cookie('email', req.body.email)
                        res.cookie('password', req.body.password)
                    }
                    console.log("login success",);
                    console.log(data.firstname);

                    res.redirect("/blog");
                } else {
                    console.log("Invalid Password...");
                    // res.redirect("/");
                    // req.flash("message", "Invalid Password");
                    res.redirect("/login");
                }
            } else {
                // console.log("Account Is Not Verified");
                req.flash("message", "Account Is Not Verified");
                res.redirect("/login");
            }
        } else {
            console.log("Invalid Email...");
            // res.redirect("/");
            // req.flash("message", "Invalid Email");
            res.redirect("/login");
        }
    })
}


const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}


const Cardiology=(req,res)=>{
    DoctorModel.aggregate([{$match:{specialist:"Cardiology"}}]).then(result=>{
        res.redirect('./user/doctor',{
            doctors: result,
            data: req.user
        })
    })
}

const Dentist = (req,res)=>{
    DoctorModel.aggregate([{$match:{specialist:"Dentist"}}]).then(result=>{
        res.render('./user/doctor',{
            doctors: result,
            data: req.user
        })
    })
}
const Physician = (req,res)=>{
    DoctorModel.aggregate([{$match:{specialist:"Physician"}}]).then(result=>{
        res.render('./user/doctor',{
            doctors: result,
            data: req.user
        })
    })
}
const Astrology = (req,res)=>{
    DoctorModel.aggregate([{$match:{specialist:"Astrology"}}]).then(result=>{
        res.render('./user/doctor',{
            doctors: result,
            data: req.user
        })
    })
}
const BloodScreening = (req,res)=>{
    DoctorModel.aggregate([{$match:{specialist:"Blood Screening"}}]).then(result=>{
        res.render('./user/doctor',{
            doctors: result,
            data: req.user
        })
    })
}


module.exports = {
    home, about, contact, createContact, department, doctor, blog, blog_details, Appointment,
    register, CreateRegister, conformation, login, signin, logout, userAuth, Cardiology , Dentist,
    Physician, Astrology, BloodScreening
}