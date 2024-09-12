const express = require('express');
const {registerUser,getAllUser, signIn, signOut} = require('../controller/userController');
const authenctication = require('../middleware/Authentication');
const router = express.Router();
router.route('/register').post(registerUser);
router.route('/getAllUser').get(authenctication,getAllUser);
router.route('/signin').post(signIn);
router.route('/signOut').post(signOut);

module.exports=router;
