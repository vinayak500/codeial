const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user_controller');


router.get('/profile' , usercontroller.profile );
router.get('/sign-in' , usercontroller.signIn );
router.get('/sign-up' , usercontroller.signUp );
router.get('/create' , usercontroller.create );


module.exports = router;