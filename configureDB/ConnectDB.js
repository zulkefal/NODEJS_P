const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(process.env.mongoURI)
    .then(()=>console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));
}

module.exports = connectDB;