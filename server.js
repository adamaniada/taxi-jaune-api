const express = require("express")
const app = express()
// Use static file
app.use("/assets", express.static("assets"));



app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/sign-in.html");
})

// app.post("/", function(req, res) {
//     const { phoneNumber, password } = req.body
//     console.log(phoneNumber)
//     console.log(password)

//     res.redirect("./welcome.html");
// })



app.post('/', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});


const usersRouter = require("./routes/v1/users.router")
const requettesRouter = require("./routes/v1/requettes.router")
const locationsRouter = require("./routes/v1/locations.router")
const notificationsRouter = require("./routes/v1/notifications.router")
const favorisRouter = require("./routes/v1/favoris.router")
const notesRouter = require("./routes/v1/notes.router")


require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/v1/users", usersRouter)
app.use("/api/v1/requettes", requettesRouter)
app.use("/api/v1/locations", locationsRouter)
app.use("/api/v1/notifications", notificationsRouter)
app.use("/api/v1/favoris", favorisRouter)
app.use("/api/v1/notes", notesRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is running .....")
})

// SET PASSWORD FOR 'root'@'localhost' = PASSWORD('adamaniada');
// FLUSH PRIVILEGES;