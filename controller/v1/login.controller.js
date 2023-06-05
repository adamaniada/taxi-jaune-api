const pool = require("../../database/Config")
const bcrypt = require("bcrypt");
const path = require('path')
var jwt = require('jsonwebtoken');
require('dotenv').config()

const loginController = {
    loginForm: (request, response) => {
        response.sendFile(path.resolve('public/sign-in.html'));
    },
    login: async (request, response) => {
        try {
            // Get input
            const { phoneNumber, password } = request.body;
        
            // Validate input
            if (!(phoneNumber && password)) {
                response.status(400).send("Tout les champs sont requit");
            }
            // Validate if query exist in our database
            const [users, fields] = await pool.query("select * from users where phoneNumber = ?", [phoneNumber])
        
            if (users.length > 0) {
                for(let i=0; i<users.length; i++){
                    if (await bcrypt.compare(password, users[i].password)) {
                        // Create token
                        const token = jwt.sign(
                            { user_id: users._id, phoneNumber },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "2h",
                            }
                        );
                
                        // save token
                        users.token = token;
                    
                        // return response
                        // response.status(200).json(users);
                        response.redirect('/dashboard');
                    }
                }
			} else {
				response.status(400).send("Invalid Credentials");
			}	
          } catch (err) {
            console.log(err);
        }
    }
}

module.exports = loginController
