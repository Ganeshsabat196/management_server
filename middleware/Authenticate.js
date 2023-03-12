const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const Authenticate = async (req, res, next) => {
    try {
        
        const token = req.cookies.jwtoken; // fetching cookies from browser
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY); // checking the correction with with the SECRET_KEY

        const rootUser = await User.findOne({ // checking the token present in database and which field
            _id: verifyToken._id,
            "tokens.token": token
        })

        if (!rootUser) {
            throw new Error('User not found')
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send(' Nahi h Unauthorized : no token provided')
        console.log(error);
    }
}

module.exports = Authenticate