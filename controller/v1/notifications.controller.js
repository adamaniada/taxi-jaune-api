const pool = require("../../database/Config")

const postController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from notifications")
            // res.json({message: "Get all notifications"})
            res.json({
                data: rows
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
            const [rows, fields] = await pool.query("select * from notifications where id=?", [id])
            res.json({
                data: rows
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
            const { user_id, description, status } = req.body
            
            if(!user_id && !description) {
                return res.sendStatus(400);
            }

            const sql = "insert into notifications (user_id, description, status) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [user_id, description, status])
            res.json({
                data: rows
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
            const { user_id, description, status } = req.body
            const { id } = req.params
            const sql = "update notifications set user_id = ?, description = ?, status = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [user_id, description, status, id])
            res.json({
                data: rows
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
            const [rows, fields] = await pool.query("delete from notifications where id = ?", [id])
            res.json({
                data: rows
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
