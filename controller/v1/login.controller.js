const pool = require("../../database/Config")

const loginController = {
    loginForm: (request, response) => {
        response.sendFile(__dirname + "../../public/sign-in.html");
    },
    login: async (request, response) => {
        try {
            const { phoneNumber, password } = request.body

            if(!phoneNumber && !password) {
                response.send('Please enter phoneNumber and Password!');
		        response.end();
            }

            const [rows, fields] = await pool.query("select * from users where phoneNumber = ? and password = ?", [phoneNumber, password])

            if (rows.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.phoneNumber = phoneNumber;
                console.log("New auth user detected ---------------------------------------->");
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}	
        } catch (error) {
            console.log(error)
            response.json({
                status: "error"
            })
        }
    },
    home: (request, response) => {
        if (request.session.loggedin) {
            // Output username
            response.send('Welcome back, ' + request.session.phoneNumber + '!');
        } else {
            // Not logged in
            response.send('Please login to view this page!');
        }
        response.end();
    }
}

module.exports = loginController
