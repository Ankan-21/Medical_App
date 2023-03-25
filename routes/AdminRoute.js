const router=require('express').Router();
const AdminController=require("../controllers/AdminController");
const DoctorController = require('../controllers/DoctorController')
const BlogController = require('../controllers/BlogController')



router.get('/', AdminController.show_login);
router.post('/sigin', AdminController.admin_login);

router.get('/dashboard',AdminController.adminAuth, AdminController.dashboard);
router.get('/users',AdminController.adminAuth, AdminController.user);
router.get('/logout', AdminController.logout)

// Doctor Router
router.get('/doctor',AdminController.adminAuth, DoctorController.doctor);
router.post('/adddoctor' , DoctorController.addDoctor)

//Blog Router
router.get('/blog',AdminController.adminAuth, BlogController.blog);
router.post('/addblog' , BlogController.addBlog)


module.exports=router;
