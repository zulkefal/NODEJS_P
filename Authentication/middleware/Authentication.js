const jwt = require('jsonwebtoken');

const authenctication = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ "Message": "Only logged In User Can access all the users" });
    } else {
        try {
            const decodedToken = jwt.verify(token, process.env.tokenSecret);

            if (decodedToken.exp > Date.now() / 1000) {
                req.decodedToken = decodedToken;
                next();
            } 
        } catch (err) {
            return res.status(401).json({ "Message": "Token is Expired" });
        }
    }
}

module.exports = authenctication;