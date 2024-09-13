const jwt = require('jsonwebtoken');

const authenctication = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ "Message": "Only logged In User Can access all the users" });
    } else {
        try {
            const decodedToken = jwt.verify(token, process.env.tokenSecret);
            if (decodedToken) {
                req.decodedToken = decodedToken;
                next();
            } 
        } catch (err) {
            return res.status(401).json({ "Message": "Invalid Token" });
        }
    }
}

module.exports = authenctication;