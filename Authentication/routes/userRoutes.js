const express = require('express');
const {registerUser,getAllUser} = require('../controller/userController');
const router = express.Router();
router.route('/register').post(registerUser);
router.route('/getAllUser').get(getAllUser);


module.exports=router;
