const router=require('express').Router();
const UserController=require("../controllers/UserController");
const verifysiginin=require('../middlewares/verifysignin');
const UserAuth = require('../middlewares/userAuth')


// User login 
router.get('/login', UserController.login)
router.post('/signin', UserController.signin)

// Admin And User Register
router.get('/register', UserController.register)
router.post('/signup',[verifysiginin.checkDuplicateEntries], UserController.CreateRegister)

// All User Pages
router.get('/', UserController.home);
router.get('/about', UserController.about);
router.get('/doctor',UserController.userAuth, UserController.doctor);
router.get('/doctor-details/:id', UserController.doctor_single);
router.get('/blog', UserController.blog);
router.get('/blog-single', UserController.blog_details)
router.get('/department', UserController.department);
router.get('/contact', UserController.contact);

// User Logout
router.get('/logout', UserController.logout)

// User Mail Send
router.post('/sendemail' , UserAuth.authjwt, UserController.sendemail)


module.exports=router;
