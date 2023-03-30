const UserModel=require('../models/UserModel');
const AboutModel=require('../models/AboutModel');
const BlogModel = require('../models/BlogModel')
const appointmentModel=require('../models/AppointmentModel')
const CategoryModel=require('../models/CategoryModel')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookie=require('cookie-parser')

// Admin Auth
const adminAuth = (req, res, next) => {
    if (req.admin) {
        console.log(req.admin);
        next();
    } else {
        console.log(req.admin);
        res.redirect("/admin");
    }
}

// Admin Login
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


// Admin Logout
const logout = (req, res) => {
    res.clearCookie("adminToken")
    res.redirect('/admin')
}

// Admin Dashboard
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


// Admin About Data

const AdminAbout=(req,res)=>{
    AboutModel.find((err, data)=>{
        if(!err){
            res.render('./admin/about' , {
                'title' : 'About Page',
                data:req.admin,
                abouts : data,
            })
        }
    })
}

const addAbout = (req,res)=>{
    const aboutdata = new AboutModel({
        content : req.body.content,
        AboutImage:req.file.filename,
    })
    aboutdata.save().then(data=>{
        res.redirect('./about')
        console.log(data);
    }).catch(err=>{
        res.redirect('./about')
        console.log(err);
    })
}

const activeHeadline= (req, res) => {
    aid=req.params.id
    AboutModel.findByIdAndUpdate(aid, {
        status: true
    }).then(result => {
        console.log("Headline Activeted...");
        res.redirect("/admin/about");
    }).catch(err => {
        console.log(err);
    })
}

const deActiveHeadline = (req, res) => {
    aid=req.params.id
    AboutModel.findByIdAndUpdate(aid, {
        status: false
    }).then(result => {
        console.log("Headline Deactiveted...");
        res.redirect("/admin/about");
    }).catch(err => {
        console.log(err);
    })
}

// Admin Blog Data
const blog=(req,res)=>{
    BlogModel.find((err, data)=>{
        if(!err){
            res.render('./admin/blogs' , {
                'title' : 'Blog Page',
                blogs : data,
            })
        }
    })
}


const addBlog = (req,res)=>{
    const blogdata = new BlogModel({
        title : req.body.title,
        subtitle : req.body.subtitle,
        content : req.body.content,
        PostImage : req.file.filename,
    })
    blogdata.save().then(data=>{
        res.redirect('/admin/blog')
        console.log(data);
    }).catch(err=>{
        res.redirect('/admin/blog')
        console.log(err);
    })
}

const activeBlog= (req, res) => {
    const bid=req.params.id
    BlogModel.findByIdAndUpdate(bid, {
        status: true
    }).then(result => {
        console.log("Blog Activeted...");
        res.redirect("/admin/blog");
    }).catch(err => {
        console.log(err);
    })
}


const deActiveBlog = (req, res) => {
    const bid=req.params.id
    BlogModel.findByIdAndUpdate(bid,{
        status: false
    }).then(result => {
        console.log("Blog Deactiveted...");
        res.redirect("/admin/blog");
    }).catch(err => {
        console.log(err);
    })
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

// Appointment data stored in admin dashboard
const AdminAppointment=(req,res)=>{
    appointmentModel.find().then(result =>{
        res.render("./admin/appointment",{
            title: "Admin | Appointment",
            data: req.admin,
            AppointmentData:result
        })
    }).catch(err => {
        console.log(err);
    })
    
}

const DeleteAppointment=(req,res)=>{
    aid=req.params.id
    appointmentModel.deleteOne({_id:aid}).then(del=>{
        res.redirect('/admin/appointment'),
        console.log(del,"Appointment deleted successfully");
    }).catch(err=>{
        console.log(err);
    })
}


// Category Data 

const Category=(req,res)=>{
    CategoryModel.find().then(result=>{
       res.render('./admin/category',{
           title:"Admin || Category",
          data: req.admin,
          categorys:result
       })
    }).catch(err=>{
       console.log(err);
    })
   
}

const addCategory = (req, res) => {
    const categorydata = new CategoryModel({
        specialist: req.body.specialist,
        catImage: req.file.filename,
    })
    categorydata.save().then(data => {
        res.redirect('/admin/category')
        console.log(data);
    }).catch(err => {
        res.redirect('/admin/category')
        console.log(err);
    })
}

const activeCategory = (req, res) => {
    const cid=req.params.id;
    CategoryModel.findByIdAndUpdate(cid,{
        status:true
    }).then(result => {
        console.log(result);
        console.log("Activeted...");
        res.redirect("/admin/category");
    }).catch(err => {
        console.log(err);
    })
}


const deActiveCategory = (req, res) => {
    const cid=req.params.id;
    CategoryModel.findByIdAndUpdate(cid, {
        status:false
    }).then(result => {
        console.log(result);
        console.log(" Deactiveted...");
        res.redirect("/admin/category");
    }).catch(err => {
        console.log(err);
    })
}





module.exports={
    adminAuth,

    show_login,admin_login,logout,

    dashboard,

    AdminAbout,addAbout,activeHeadline,deActiveHeadline,

    blog,addBlog,activeBlog,deActiveBlog,

    user,activeUser,deActiveUser,deleteUser,

    AdminAppointment,DeleteAppointment,

    Category,addCategory,activeCategory,deActiveCategory 
}