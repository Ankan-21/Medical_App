const express = require('express');
const router=require('express').Router();
const multer =require('multer');
const path =require('path');
const AdminController=require("../controllers/AdminController");
const DoctorController = require('../controllers/DoctorController')
const BlogController = require('../controllers/BlogController')







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

router.get('/dashboard',AdminController.adminAuth, AdminController.dashboard);
router.get('/users',AdminController.adminAuth, AdminController.user);
router.get('/logout', AdminController.logout)

// Doctor Router
router.get('/doctor',AdminController.adminAuth, DoctorController.doctor);
router.post('/adddoctor',upload.single('image'), DoctorController.addDoctor)

//Blog Router
router.get('/blog',AdminController.adminAuth, BlogController.blog);
router.post('/addblog' , BlogController.addBlog)


module.exports=router;
