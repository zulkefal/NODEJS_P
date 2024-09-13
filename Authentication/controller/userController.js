const NewUser = require('../models/NewUserModel');
const UserService = require('../Services/UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = new UserService(NewUser);


const registerUser = async (req,res)=>{
    const {userName,fullName,email,password,gender,role}= req.body;
    try{
        const newUser = await userService.registerUser({userName,fullName,email,password,gender,role});
        if(newUser)
        {
            return res.status(200).json({"message":"User registered successfully"});
        }
    }
    catch(err){
        return res.status(400).json({"message":err.message});
    }
}

const validateUser = async (req,res,next)=>{
    const {role} = req.body;
    const roles = ['Admin','User','Guest'];
    if(!roles.includes(role)){
        return res.status(400).json({"message":"Invalid role"});
    }
    else{
        next();
    }
}
const getAllUser = async (req,res)=>{
    const allUsers = await NewUser.find();
    if(allUsers){
        return res.status(200).json(allUsers);
    }
    else{
        return res.status(400).json({"message":"No user found"});
    }

}
const signIn = async (req,res) => {
    const {userName,password} = req.body;
    if(!userName || !password){
        return res.status(400).json({"message":"Please fill all the fields"});
    }
    const user = await NewUser.findOne({userName});
    if(user)
    {
        const confirm_password = await bcrypt.compare(password,user.password)
        if(confirm_password)
        {
            console.log("User Role",user)
            const tokenData= {
                UserID:user._id,
                userRole:user.role
            }
            const token = jwt.sign(tokenData,process.env.tokenSecret,{expiresIn:'1s'});
            return res.status(200).cookie("token",token, {httpOnly:true}).json({"message":"User logged in successfully"});
        }
        else
        {
            return res.status(400).json({"message":"Invalid password"});
        }
    }
    else{
        return res.status(400).json({"message":"User not found"});
    }
}

const signOut = async (req,res)=>{
    return res.status(200).clearCookie("token").json({"message":"User logged out successfully"});
}
module.exports = {registerUser,getAllUser,signIn,signOut,validateUser};