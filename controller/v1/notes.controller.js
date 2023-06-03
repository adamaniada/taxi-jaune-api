const pool = require("../../database/Config")

const postController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from notes")
            // res.json({message: "Get all notes"})
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
            const [rows, fields] = await pool.query("select * from notes where id=?", [id])
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
            const { mobile_user_id, taxi_user_id, notes, commentaires } = req.body
            
            if(!mobile_user_id && !taxi_user_id && !notes && !commentaires) {
                return res.sendStatus(400);
            }

            const sql = "insert into notes (mobile_user_id, taxi_user_id, notes, commentaires) values (?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, taxi_user_id, notes, commentaires])
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
            const { mobile_user_id, taxi_user_id, notes, commentaires } = req.body
            const { id } = req.params
            const sql = "update notes set mobile_user_id = ?, taxi_user_id = ?, notes = ?, commentaires= ? where id = ?"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, taxi_user_id, notes, commentaires, id])
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
            const [rows, fields] = await pool.query("delete from notes where id = ?", [id])
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
