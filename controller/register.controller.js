const path = require('path')
const pool = require("../database/Config")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')
require('dotenv').config()


const registerController = {
    registerForm: (request, res) => {
        res.sendFile(path.resolve('public/register.html'));
    },
    register: async (request, res) => {
        // Our register logic starts here
        try {
            const { phoneNumber, password } = request.body;
            let user_type = "mobile"
            let role = "client"
            let created_at = new Date()
            let updated_at = new Date()

            if (!(phoneNumber && password)) {
                res.status(400).send("All input is required");
            }

            const [oldUser, fields] = await pool.query("select * from users where phoneNumber = ?", [phoneNumber])
        
            if (oldUser.length > 0) {
                return res.status(409).send("User Already Exist. Please Login");
            }
        
            //Encrypt password
            encryptedPassword = await bcrypt.hash(password, 10);
        
            // Create in our database
            const [ newUser, champs ] = await pool.query("insert into users (phoneNumber, password, user_type, role, created_at, updated_at) values (?, ?, ?, ?, ?, ?)", [phoneNumber, encryptedPassword, user_type, role, created_at, updated_at])
            
            // get last saved id
            let id = null
            const [ getUserId, field ] = await pool.query("select id from users where phoneNumber = ?", [phoneNumber])
            for(let i=0; i<getUserId.length; i++){
                id = getUserId[i].id
            }

            // create token
            const token = jwt.sign({ id, phoneNumber, user_type, role, created_at, updated_at }, process.env.JWT_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.JWT_EXPIRES_IN,
            })

            // save token
            await pool.query("update users set token = ? where phoneNumber = ?", [token, phoneNumber])
            
            // set cookies
            res.cookie("token", token, { maxAge: 8*60*60*1000 })
        
            // return res
            console.log(`New user detected phoneNumber: ${phoneNumber} -------------------------------------->`)

            // return new register data
            const [ newUserData, champ ] = await pool.query("select * from users where phoneNumber = ?", [phoneNumber])
            res.status(201).json({ "data": newUserData });
            // res.redirect('/dashboard');
            res.end()
        } catch (err) {
            console.log(err);
        }
        // Our register logic ends here
    }
}

module.exports = registerController
