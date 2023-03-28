const UserModel = require('../models/UserModel');
const DoctorModel = require('../models/DoctorModel')
const BlogModel = require('../models/BlogModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

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
const about = (req, res) => {
    res.render("./user/about", {
        data: req.user
    })
}
const contact = (req, res) => {
    res.render("./user/contact", {
        data: req.user
    })
}
const department = (req, res) => {
    res.render("./user/department", {
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

const doctor_single = (req, res) => {
    const id = req.params.id;
    DoctorModel.findById(id).then(result => {
        console.log(result);
        res.render("./user/doctor-single", {
            DoctorData: result,
            data: req.user
    })
    }).catch(err => {
        console.log(err);
    })}
   

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
        data: req.user
    })
}

const CreateRegister = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const User = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        emailPass: req.body.emailPass,
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

const login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined

    res.render("./user/login-register", {
        title: "Login-Registration",
        data: req.user,
        data1: loginData
    })
}

    const signin = (req, res) => {
        UserModel.findOne({
            email: req.body.email
        }).exec((err, data) => {
            if (data) {
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
            }
            else {
                console.log("Invalid Email...");
                // res.redirect("/");
                // req.flash("message", "Invalid Email");
                res.redirect("/login");
            }
        })
    }

    const sendemail = (req, res) => {
        UserModel.findOne({
            email: req.body.email,
        }).then((user) => {
            if (user) {
                const email = user.email
                const password = user.emailPass
                // generate token
                var transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: `${email}`,
                        pass: `${password}`
                    }
                });
                var mailOptions = {
                    from: req.body.email,
                    to: "subhajit.das2406@gmail.com",
                    subject: req.body.subject,
                    text: req.body.firstname+' here'+'\n'+req.body.message
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        console.log("Techniclal Issue...");
                        console.log(err);
                    } else {
                        // req.flash("message", "Mail has been sent");
                        res.redirect("/contact");
                    }
                });



            } else {
                console.log("Error When Create User...", err);
            }
        })
    }

    const logout = (req, res) => {
        res.clearCookie("token");
        res.redirect("/");
    }

    module.exports = {
        home, about, contact, department, doctor, doctor_single, blog, blog_details,
        register, CreateRegister, login, signin, sendemail, logout, userAuth
    }