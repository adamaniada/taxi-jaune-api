const express = require("express")
const app = express()
// Use static file
app.use("/assets", express.static("assets"));



app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/sign-in.html");
})

app.post("/", function(req, res) {
    var number = res.body.number;
    var password = res.body.password;

    res.redirect("./welcome.html");
})


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