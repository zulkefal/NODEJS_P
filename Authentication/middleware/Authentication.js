const jwt = require('jsonwebtoken');
const authenctication = (req, res, next) => {
    const token = req.cookies.token;
    if(!token)
    {
        return res.status(401).json({"Message":"Only loggedIn User Can access all the users"});
    }
    else{
        const decodedToken = jwt.verify(token,process.env.tokenSecret)
        if(decodedToken)
        {
            next();
        }
        else{
            return res.status(401).json({"Message":"Invalid Token"});

        }
    }
}

module.exports = authenctication;