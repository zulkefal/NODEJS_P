const NewUser = require('../models/NewUserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerUser = async (req,res)=>{
    const {userName,fullName,email,password,gender}= req.body;
    if(!userName || !fullName || !email || !password || !gender){
        return res.status(400).json({"message":"Please fill all the fields"});
    }

    const user = await NewUser.findOne({userName});
    if(user){
        console.log(user)
        return res.status(400).json({"message":"User already eeeexists"});
    }

    else
    {
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await NewUser.create({
            userName,
            fullName,
            email,
            password:hashPassword,
            gender
        })

        if (newUser)
        {
            return res.status(201).json({"message":"User registered successfully"});
        }
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
            const tokenData= {
                UserID:user._id,
            }
            const token = jwt.sign(tokenData,process.env.tokenSecret,{expiresIn:'1h'});
            console.log(token)
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
module.exports = {registerUser,getAllUser,signIn,signOut};