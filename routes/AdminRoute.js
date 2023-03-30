const express = require('express');
const router=require('express').Router();
const multer =require('multer');
const path =require('path');
const AdminController=require("../controllers/AdminController");
const DoctorController = require('../controllers/DoctorController')
const BlogController = require('../controllers/BlogController')
const AboutController=require('../controllers/AboutController')


router.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/upload'), function (error, success) {
            if (error) throw error;
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '_' + path.extname(file.originalname)
        cb(null, name, function (error1, success1) {
            if (error1) throw error1
        })
    }
});
const maxSize = 2 * 1024 * 1024;

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: {
        fileSize: maxSize
    }
});




router.get('/', AdminController.show_login);
router.post('/sigin', AdminController.admin_login);
router.get('/logout', AdminController.logout)

//Admin DashBoard
router.get('/dashboard',AdminController.adminAuth, AdminController.dashboard);

//User Page
router.get('/users',AdminController.adminAuth, AdminController.user);
router.get("/activeuser/(:id)", AdminController.activeUser);
router.get("/deactiveuser/(:id)", AdminController.deActiveUser);
router.get('/remove-user/(:id)', AdminController.deleteUser)

//admin About Page
router.get('/about',AdminController.adminAuth,AboutController.AdminAbout);
router.post('/addabout',upload.single('image'),AboutController.addAbout)
router.get("/activeHeadline/(:id)", AboutController.activeHeadline);
router.get("/deactiveHeadline/(:id)", AboutController.deActiveHeadline);

// Doctor Router
router.get('/doctor',AdminController.adminAuth, DoctorController.doctor);
router.post('/adddoctor',upload.single('image'), DoctorController.addDoctor)
router.get("/activedoctor/(:id)", DoctorController.activeDoctor);
router.get("/deactivedoctor/(:id)", DoctorController.deActiveDoctor);

//Blog Router
router.get('/blog',AdminController.adminAuth, BlogController.blog);
router.post('/addblog' ,upload.single('image'), BlogController.addBlog)
router.get("/activeblog/(:id)", BlogController.activeBlog);
router.get("/deactiveblog/(:id)", BlogController.deActiveBlog);

//Appointment
router.get('/appointment', AdminController.adminAuth, AdminController.AdminAppointment)


module.exports=router;
