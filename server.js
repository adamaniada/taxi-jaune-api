const express = require("express")
const app = express()

const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
const path = require('path');
// Use static file
app.use("/assets", express.static("assets"));


app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { phoneNumber, password } = req.body;
  
      // Validate user input
      if (!(phoneNumber && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ phoneNumber });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, phoneNumber },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
});





app.get("/", function(req, res) {
    // console.log(require("dotenv").config())
    // console.log(process.env)
    res.sendFile(__dirname + "/public/sign-in.html");
})

app.get("/dashboard", function(req, res) {
    res.sendFile(__dirname + "/public/admin/dashboard.html");
})



const loginRouter = require("./routes/v1/login.router")
const usersRouter = require("./routes/v1/users.router")
const requettesRouter = require("./routes/v1/requettes.router")
const locationsRouter = require("./routes/v1/locations.router")
const notificationsRouter = require("./routes/v1/notifications.router")
const favorisRouter = require("./routes/v1/favoris.router")
const notesRouter = require("./routes/v1/notes.router")


require('dotenv').config()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.use("/", loginRouter)

app.use("/api/v1/users", usersRouter)
app.use("/api/v1/requettes", requettesRouter)
app.use("/api/v1/locations", locationsRouter)
app.use("/api/v1/notifications", notificationsRouter)
app.use("/api/v1/favoris", favorisRouter)
app.use("/api/v1/notes", notesRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is running on ", PORT, ".....")
})

// SET PASSWORD FOR 'root'@'localhost' = PASSWORD('adamaniada');
// FLUSH PRIVILEGES;
