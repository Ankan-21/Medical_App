const router=require('express').Router();
const AdminController=require("../controllers/AdminController");




router.get('/', AdminController.admin_login);
router.post('/sigin', AdminController.login);

router.get('/dashboard',AdminController.adminAuth, AdminController.dashboard);
router.get('/doctor',AdminController.adminAuth, AdminController.doctor);
router.get('/users',AdminController.adminAuth, AdminController.user);
router.get('/blog',AdminController.adminAuth, AdminController.blog);
router.get('/logout', AdminController.logout)



module.exports=router;
