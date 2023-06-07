const pool = require("../../database/Config")
const bcrypt = require("bcrypt")

const postController = {
    getAll: async (req, res) => {
        try {
            const [users, fields] = await pool.query("select * from users")
            
            res.json({
                data: users
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [users, fields] = await pool.query("select * from users where id=?", [id])
            res.json({
                data: users
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { phoneNumber, password, user_type, role } = req.body
            let created_at = new Date()
            let updated_at = new Date()
            
            if(!phoneNumber && !password) {
                return res.sendStatus(400);
            }

            // check existing phoneNumber
            const [oldUser, champs] = await pool.query("select * from users where phoneNumber = ?", [phoneNumber])
            if (oldUser.length > 0) {
                return res.status(409).send("User Already Exist.");
            }

            //Encrypt password
            encryptedPassword = await bcrypt.hash(password, 10);

            const [users, fields] = await pool.query("insert into users (phoneNumber, password, user_type, role, created_at, updated_at) values (?, ?, ?, ?, ?, ?)", [phoneNumber, encryptedPassword, user_type, role, created_at, updated_at])
            res.json({
                data: users
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            // input data
            const { phoneNumber, password, user_type, role } = req.body
            let updated_at = new Date()
            const { id } = req.params

            // update data
            const sql = "update users set phoneNumber = ?, password = ?, user_type = ?, role = ?, updated_at = ? where id = ?"
            const [users, fields] = await pool.query(sql, [phoneNumber, password, user_type, role, updated_at, id])
            res.json({
                data: users
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [users, fields] = await pool.query("delete from users where id = ?", [id])
            res.json({
                data: users
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = postController
