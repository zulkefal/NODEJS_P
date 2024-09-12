const express = require('express');
const connectDB = require('./configureDB/ConnectDB');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const bodyParser = require ('body-parser');
dotenv.config();
const App = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI
App.use(express.json());
App.use(bodyParser.json());
App.use(cookieParser());


App.use('/api/newUser',userRouter);

App.listen(port,()=>{
    connectDB(mongoURI);
    console.log(`Server is listening on Port ${port}`);
})