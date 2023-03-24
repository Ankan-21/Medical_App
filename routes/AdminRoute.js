const router=require('express').Router();
const AdminController=require("../controllers/AdminController");
const DoctorController = require('../controllers/DoctorController')



router.get('/', AdminController.show_login);
router.post('/sigin', AdminController.admin_login);

router.get('/dashboard',AdminController.adminAuth, AdminController.dashboard);
router.get('/users',AdminController.adminAuth, AdminController.user);
router.get('/blog',AdminController.adminAuth, AdminController.blog);
router.get('/logout', AdminController.logout)

// Doctor Router
router.get('/doctor',AdminController.adminAuth, DoctorController.doctor);
router.post('/adddoctor' , DoctorController.addDoctor)

module.exports=router;
