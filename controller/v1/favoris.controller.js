const pool = require("../../database/Config")

const postController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from favoris")
            // res.json({message: "Get all favoris"})
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
            const [rows, fields] = await pool.query("select * from favoris where id=?", [id])
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
            const { mobile_user_id, taxi_user_id, commentaires } = req.body
            
            if(!mobile_user_id && !taxi_user_id && !commentaires) {
                return res.sendStatus(400);
            }

            const sql = "insert into favoris (mobile_user_id, taxi_user_id, commentaires) values (?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, taxi_user_id, commentaires])
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
            const { mobile_user_id, taxi_user_id, commentaires } = req.body
            const { id } = req.params
            const sql = "update favoris set mobile_user_id = ?, taxi_user_id = ?, commentaires= ? where id = ?"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, taxi_user_id, commentaires, id])
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
            const [rows, fields] = await pool.query("delete from favoris where id = ?", [id])
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
