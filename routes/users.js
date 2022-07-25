const express = require('express');
const router = express.Router();
const passport = require('passport');
const usercontroller = require('../controllers/user_controller');


router.get('/profile/:id' , passport.checkAuthentication ,  usercontroller.profile );
router.get('/sign-in' , usercontroller.signIn );
router.get('/sign-up' , usercontroller.signUp );
router.post('/create' , usercontroller.create );
router.post('/update/:id' , passport.checkAuthentication ,  usercontroller.update );

//use passport as middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local' ,
    {failureRedirect: '/users/sign-in'},
) , usercontroller.createSession);



router.get('/sign-out' , usercontroller.destroySession);
module.exports = router;