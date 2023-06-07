const path = require('path')
const pool = require("../database/Config")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')
require('dotenv').config()


const loginController = {
    loginForm: (req, res) => {
        res.sendFile(path.resolve('public/login.html'));
    },
    submitLoginData: async (req, res) => {
        try {
            // input data
            const { phoneNumber, password } = req.body;

            // input data validation
            if (!(phoneNumber && password)) {
                response.status(400).send("Tout les champs sont requit");
            }

            // database query
            const [users, fields] = await pool.query("select * from users where phoneNumber = ?", [phoneNumber])
        
            if (users.length > 0) {
                for(let i=0; i<users.length; i++){
                    if (await bcrypt.compare(password, users[i].password)) {
                        // var declaration
                        let id = users[i].id
                        let user_type = users[i].user_type
                        let role = users[i].role
                        let created_at = users[i].created_at
                        let updated_at = users[i].updated_at

                        // create token
                        const token = jwt.sign({ id, phoneNumber, user_type, role, created_at, updated_at }, process.env.JWT_SECRET, {
                            algorithm: "HS256",
                            expiresIn: process.env.JWT_EXPIRES_IN,
                        })

                        // set cookies
                        res.cookie("token", token, { maxAge: 8*60*60*1000 })
                    }
                }

                console.log(`User is auth phoneNumber: ${phoneNumber} -------------------------------------->`)
                res.status(200).json({"data": users});
                // response.redirect('/dashboard');
			} else {
				res.status(400).send("Invalid Credentials");
			}	
          } catch (err) {
            console.log(err);
        }
    }
}

module.exports = loginController
