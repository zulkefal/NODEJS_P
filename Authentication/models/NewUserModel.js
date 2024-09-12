const mongoose = require('mongoose');

const NewUserModel = new mongoose.Schema({
    userName: {
        type:String,
        require:true
    },
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    
},{timestamps:true});

const NewUser = mongoose.model('NewUser',NewUserModel);
module.exports = NewUser;