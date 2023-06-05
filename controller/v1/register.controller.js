const pool = require("../../database/Config")
const path = require('path')
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')


const loginController = {
    registerForm: (request, response) => {
        response.sendFile(path.resolve('public/sign-in.html'));
    },
    register: async (request, response) => {
        // Our register logic starts here
        try {
            const { phoneNumber, password } = request.body;

            if (!(phoneNumber && password)) {
                res.status(400).send("All input is required");
            }

            const [oldUser, fields] = await pool.query("select * from users where phoneNumber = ?", [phoneNumber])
        
            if (oldUser.length > 0) {
                return response.status(409).send("User Already Exist. Please Login");
            }
        
            //Encrypt password
            encryptedPassword = await bcrypt.hash(password, 10);
        
            // Create in our database
            const [ newUser,champs ] = await pool.query("insert into users (phoneNumber, password) values (?, ?)", [phoneNumber, encryptedPassword])
            console.log(newUser)
        
            // Create token
            const token = jwt.sign(
                { user_id: newUser._id, phoneNumber },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );

            // save token
            await pool.query("update users set token = ? where phoneNumber = ?", [token, phoneNumber])
            newUser.token = token;
        
            // return response
            // response.status(201).json(newUser);
            response.redirect('/dashboard');
        } catch (err) {
            console.log(err);
        }
        // Our register logic ends here
    }
}

module.exports = loginController
