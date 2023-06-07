const express = require("express")
const app = express()
// const path = require('path');
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

// Use static file
app.use("/assets", express.static("assets"));

// middleware import
const authorization = require("./middleware/authorization");


// router import
const welcomeRouter = require("./routes/welcome.router")
const registerRouter = require("./routes/register.router")
const loginRouter = require("./routes/login.router")
const refreshRouter = require("./routes/refresh.router")
const logoutRouter = require("./routes/logout.router")
const usersRouter = require("./routes/v1/users.router")
const requettesRouter = require("./routes/v1/requettes.router")
const locationsRouter = require("./routes/v1/locations.router")
const notificationsRouter = require("./routes/v1/notifications.router")
const favorisRouter = require("./routes/v1/favoris.router")
const notesRouter = require("./routes/v1/notes.router")

// App routes
app.use("/", welcomeRouter)
app.use("/api/register", registerRouter)
app.use("/api/login", loginRouter)
app.use("/api/refresh", refreshRouter)
app.use("/api/logout", logoutRouter)
app.use("/api/v1/users", authorization, usersRouter)
app.use("/api/v1/requettes", authorization, requettesRouter)
app.use("/api/v1/locations", authorization, locationsRouter)
app.use("/api/v1/notifications", authorization, notificationsRouter)
app.use("/api/v1/favoris", authorization, favorisRouter)
app.use("/api/v1/notes", authorization, notesRouter)

app.get("/protected", authorization, (req, res) => {
    return res.json({ 
        user: { 
            id: req.userId,
            phoneNumber: req.userPhoneNumber, 
            user_type: req.user_type,
            role: req.userRole,
            created_at: req.created_at,
            updated_at: req.updated_at
        } 
    });
});


const startServer = (port) => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit();
    }
};

const PORT = process.env.PORT || 3000
startServer(PORT);
