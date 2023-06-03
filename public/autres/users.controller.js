const bcrypt = require("bcrypt")
app.use(express.json())
//middleware to read req.body.<params>
//CREATE USER
app.post("/createUser", async (req,res) => {
    const user = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
        const search_query = mysql.format(sqlSearch,[user])
        const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
        const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query (search_query, async (err, result) => {
            if (err) throw (err)
                console.log("------> Search Results")
                console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.sendStatus(409) 
            } 
            else {
                await connection.query (insert_query, (err, result)=> {
                connection.release()
            if (err) throw (err)
                console.log ("--------> Created new User")
                console.log(result.insertId)
                res.sendStatus(201)
            })
            }
        }) //end of connection.query()
    }) //end of db.getConnection()
}) //end of app.post()