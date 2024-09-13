const express = require('express');
const {registerUser,getAllUser, signIn, signOut, validateUser} = require('../controller/userController');
const authenctication = require('../middleware/Authentication');
const authenticateAdmin = require('../middleware/AuthenticateAdmin');
const router = express.Router();
router.route('/register').post(validateUser,registerUser);
router.route('/getAllUser').get(authenctication,authenticateAdmin,getAllUser);
router.route('/signin').post(signIn);
router.route('/signOut').post(signOut);

module.exports=router;
