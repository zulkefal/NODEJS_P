const express = require('express');
const connectDB = require('./configureDB/ConnectDB');
const dotenv = require('dotenv');
dotenv.config();
const App = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI
App.listen(port,()=>{
    connectDB(mongoURI);
    console.log(`Server is listening on Port ${port}`);
})