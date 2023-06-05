const pool = require("../../database/Config")

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
            
            if(!phoneNumber && !password) {
                return res.sendStatus(400);
            }

            const sql = "insert into users (phoneNumber, password, user_type, role) values (?, ?, ?, ?)"
            const [users, fields] = await pool.query(sql, [phoneNumber, password, user_type, role])
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
            const { phoneNumber, password, user_type, role } = req.body
            const { id } = req.params
            const sql = "update users set phoneNumber = ?, password = ?, user_type = ?, role = ? where id = ?"
            const [users, fields] = await pool.query(sql, [phoneNumber, password, user_type, role, id])
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
