const pool = require("../../database/Config")
// const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
            // request mobile_user_id
            const token = req.cookies.token;
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const mobile_user_id = data.id;

            
            // input data
            const { taxi_user_id, note, commentaires } = req.body
            let created_at = new Date()
            let updated_at = new Date()
            
            
            if(!mobile_user_id && !taxi_user_id && !note && !commentaires) {
                return res.sendStatus(400);
            }

            const sql = "insert into notes (mobile_user_id, taxi_user_id, note, commentaires, created_at, updated_at) values (?, ?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, taxi_user_id, note, commentaires, created_at, updated_at])
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
            const { taxi_user_id, note, commentaires } = req.body
            const { id } = req.params
            let updated_at = new Date()

            // database update
            const sql = "update notes set taxi_user_id = ?, note = ?, commentaires= ?, updated_at = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [taxi_user_id, note, commentaires, updated_at, id])
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
