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


const user=(req,res)=>{
    res.render("./admin/users")
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

module.exports={
    adminAuth,
    show_login,admin_login,logout,
    dashboard,user 
}