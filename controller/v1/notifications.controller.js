const pool = require("../../database/Config")
// const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const postController = {
    getAll: async (req, res) => {
        try {
            // request user_id
            const token = req.cookies.token;
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const user_id = data.id;

            // database query
            const [rows, fields] = await pool.query("select * from notifications where user_id = ?", [user_id])

            //return response
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
            // request user_id
            const token = req.cookies.token;
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const user_id = data.id;

            // input data
            const { description, status } = req.body
            let created_at = new Date()
            let updated_at = new Date()
            
            if(!user_id && !description) {
                return res.sendStatus(400);
            }

            // insert data
            const [rows, fields] = await pool.query("insert into notifications (user_id, description, status, created_at, updated_at) values (?, ?, ?, ?, ?)", [user_id, description, status, created_at, updated_at])
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
            const { description, status } = req.body
            const { id } = req.params
            let updated_at = new Date()

            // update data
            const [rows, fields] = await pool.query("update notifications set description = ?, status = ?, updated_at = ? where id = ?", [description, status, updated_at, id])
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
