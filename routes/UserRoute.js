const router=require('express').Router();
const UserController=require("../controllers/UserController");
const verifysiginin=require('../middlewares/verifysignin');
router.get('/', UserController.home);
router.get('/about', UserController.about);
router.get('/doctor', UserController.doctor);
router.get('/doctor-details', UserController.doctor_single);
router.get('/blog', UserController.blog);
router.get('/blog-single', UserController.blog_details)
router.get('/department', UserController.department);
router.get('/contact', UserController.contact);
router.get('/register', UserController.register)
router.post('/signup',[verifysiginin.checkDuplicateEntries], UserController.CreateRegister)




module.exports=router;
