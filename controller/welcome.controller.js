const pool = require("../database/Config")
const path = require('path')
const jwt = require("jsonwebtoken")
require('dotenv').config()



const postController = {
    welcome: (req, res) => {
        // response.sendFile(path.resolve('public/sign-in.html'));
        res.status(200).send("Welcome 🙌 ");
    },
    authWelcome: (req,res) => {
        const token = req.cookies.token
    
        if(!token) {
            console.log("user is not logged : trying go to /welcome -------------------------------------->")
            return res.status(401).send("Login required🙌 ");
        }
    
        var payload
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                res.send(error)
                // return res.status(401).end()
            }
    
            return res.status(400).end()
        }
    
        console.log(`Welcome ${payload.phoneNumber}`)
        // res.send(`Welcome ${payload.phoneNumber} ${payload.password} ${payload.user_type} ${payload.created_at} ${payload.updated_at}`)
        res.status(400).send(`Welcome ${payload.phoneNumber} ${payload.user_type} ${payload.created_at} ${payload.updated_at}`)
    },
}

module.exports = postController
