const generateAccessToken = require("./generateAccessToken")
//import the generateAccessToken function
//LOGIN (AUTHENTICATE USER, and return accessToken)
app.post("/login", (req, res)=> {
    const user = req.body.name
    const password = req.body.password
    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "Select * from userTable where user = ?"
        const search_query = mysql.format(sqlSearch,[user])
        await connection.query (search_query, async (err, result) => {
            connection.release()
            
            if (err) throw (err)
            if (result.length == 0) {
            console.log("--------> User does not exist")
            res.sendStatus(404)
            } 
            else {
            const hashedPassword = result[0].password
                //get the hashedPassword from result
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful")
                    console.log("---------> Generating accessToken")
                    const token = generateAccessToken({user: user})   
                    console.log(token)
                    res.json({accessToken: token})
                } else {
                    res.send("Password incorrect!")
                } //end of Password incorrect
            }//end of User exists
        }) //end of connection.query()
    }) //end of db.connection()
}) //end of app.post()

const jwt = require("jsonwebtoken")
function generateAccessToken (user) {
    return 
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

module.exports=generateAccessToken
