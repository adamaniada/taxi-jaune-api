const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require('dotenv').config()


const authorization = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ "message": "Authorization is required" });
    }
    
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = data.id;
        req.userPhoneNumber = data.phoneNumber;
        req.user_type = data.user_type;
        req.userRole = data.role;
        req.created_at = data.created_at;
        req.updated_at = data.updated_at;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};

module.exports = authorization;
