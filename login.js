const mysql = require("mysql")

const express = require("express")
const bodyParser = require("body-parser")
const encoder = bodyParser.urlencoded();

const app = express()
app.use("/assets", express.static("assets"));

// const connexion = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "test"
// })

// // connect to the database
// connexion.connect(function(error){
//     if(error) throw error
//     else console.log("Connected to the database successfully")
// })



app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", encoder, function(req, res) {
    var number = res.body.number;
    var password = res.body.password;

    res.redirect("/welcome.html");
})

app.get("/welcome", function(req, res) {
    res.redirect("/welcome.html");
})

// set a port
app.listen(4500);