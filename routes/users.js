const express = require('express');
const router = express.Router();
const passport = require('passport');
const usercontroller = require('../controllers/user_controller');



router.get('/sign-in' , usercontroller.signIn );
router.get('/sign-up' , usercontroller.signUp );
router.post('/create' , usercontroller.create );


//use passport as middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local' ,
    {failureRedirect: '/users/sign-in'},
) , usercontroller.createSession);



router.get('/sign-out' , usercontroller.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usercontroller.createSession);


module.exports = router;