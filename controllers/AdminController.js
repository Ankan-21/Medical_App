const UserModel=require('../models/UserModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookie=require('cookie-parser')


const adminAuth = (req, res, next) => {
    if (req.admin) {
        console.log(req.admin);
        next();
    } else {
        console.log(req.admin);
        res.redirect("/admin");
    }
}


const dashboard = (req, res) => {
    if (req.admin) {
        UserModel.find({}, function(err) {
            if (!err) {
                res.render("admin/dashboard", {
                    data: req.admin
                })
            } else {
                console.log(err);
            }
        })
    }
}

const AdminAbout=(req,res)=>{
    res.render("./admin/about")
}

const AdminAppointment=(req,res)=>{
    res.render("./admin/appointment")
}

const show_login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render("./admin/login", {
        loginData: loginData,
    });
}



const admin_login = (req, res, next) => {
    UserModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data && data.isAdmin) {
            const hashPassword = data.password; 
            if (bcrypt.compareSync(req.body.password, hashPassword)) {
                const token = jwt.sign({
                    id: data._id,
                    email: data.email
                }, "med@123", { expiresIn: '5h' });
                res.cookie("adminToken", token);
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data);
                res.redirect("dashboard");
            } else {
             
                res.redirect("/admin");
            }
        } else {
         
            res.redirect("/admin");
        }
    })
}


const logout = (req, res) => {
    res.clearCookie("adminToken")
    res.redirect('/admin')
}

//  All User Data
const user=(req,res)=>{
    UserModel.find().then(result =>{
        res.render("./admin/users",{
            title: "Admin | All User Data",
            data: req.admin,
            displayData:result
        })
    }).catch(err => {
        console.log(err);
    })
    
}

const activeUser = (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, {
        status: true
    }).then(result => {
        console.log("User Activeted...");
        res.redirect("/admin/users");
    }).catch(err => {
        console.log(err);
    })
}


const deActiveUser = (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("User Deactiveted...");
        res.redirect("/admin/users");
    }).catch(err => {
        console.log(err);
    })
}

const deleteUser=(req,res)=>{
    uid=req.params.id
    UserModel.deleteOne({_id:uid}).then(del=>{
        res.redirect('/admin/users'),
        console.log(del,"User deleted successfully");
    }).catch(err=>{
        console.log(err);
    })
}




module.exports={
    adminAuth,
    show_login,admin_login,logout,
    dashboard, AdminAbout,
    user,activeUser,deActiveUser,deleteUser,
    AdminAppointment
}