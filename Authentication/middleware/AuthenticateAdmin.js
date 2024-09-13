
const authenticateAdmin =(req,res,next)=>{
    const decodedToken = req.decodedToken;
    if(decodedToken.role !== 'admin')
    {
        return res.status(401).json({"Message":"Only Admin Can access all the users"});
    }
    else{
        next();
    }
}

module.exports = authenticateAdmin;