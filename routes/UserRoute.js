const router=require('express').Router();
const UserController=require("../controllers/UserController");
const verifysiginin=require('../middlewares/verifysignin');
const UserAuth = require('../middlewares/userAuth')


router.get('/', UserController.home);
router.get('/about', UserController.about);
router.get('/doctor', UserController.doctor);
router.get('/doctor-details/:id', UserController.doctor_single);
router.get('/blog', UserController.blog);
router.get('/blog-single', UserController.blog_details)
router.get('/department', UserController.department);
router.get('/contact', UserController.contact);
router.get('/register', UserController.register)
router.post('/signup',[verifysiginin.checkDuplicateEntries], UserController.CreateRegister)
router.get('/login', UserController.login)
router.post('/signin', UserController.signin)
router.get('/logout', UserController.logout)


router.post('/sendemail' , UserAuth.authjwt, UserController.sendemail)



module.exports=router;
