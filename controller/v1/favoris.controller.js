const pool = require("../../database/Config")
const jwt = require("jsonwebtoken");

const postController = {
    getAll: async (req, res) => {
        try {
            // request mobile_user_id
            const token = req.cookies.token;
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const mobile_user_id = data.id;

            // database query
            const [rows, fields] = await pool.query("select * from favoris where mobile_user_id = ?", [mobile_user_id])

            // return response
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
            const [rows, fields] = await pool.query("select * from favoris where id = ?", [id])
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
            // request mobile_user_id
            const token = req.cookies.token;
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const mobile_user_id = data.id;

            
            // input data
            const { taxi_user_id, commentaires } = req.body
            let created_at = new Date()
            let updated_at = new Date()
            
            if(!mobile_user_id && !taxi_user_id && !commentaires) {
                return res.sendStatus(400);
            }

            const sql = "insert into favoris (mobile_user_id, taxi_user_id, commentaires, created_at, updated_at) values (?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, taxi_user_id, commentaires, created_at, updated_at])
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
            // input data
            const { taxi_user_id, commentaires } = req.body
            const { id } = req.params
            let updated_at = new Date()

            // update data
            const sql = "update favoris set taxi_user_id = ?, commentaires= ?, updated_at = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [taxi_user_id, commentaires, updated_at, id])
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
