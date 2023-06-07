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
            const [rows, fields] = await pool.query("select * from locations where user_id = ?", [user_id])

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
            const [rows, fields] = await pool.query("select * from locations where id=?", [id])
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
            const { latitude, longitude, altitude, speed, heart, name, description } = req.body
            let created_at = new Date()
            let updated_at = new Date()
            
            if(!latitude && !longitude && !altitude && !speed && !heart && !name && !description) {
                return res.sendStatus(400);
            }

            const sql = "insert into locations (user_id, latitude, longitude, altitude, speed, heart, name, description, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, latitude, longitude, altitude, speed, heart, name, description, created_at, updated_at])
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
            const { latitude, longitude, altitude, speed, heart, name, description } = req.body
            const { id } = req.params
            let updated_at = new Date()

            const sql = "update locations set latitude = ?, longitude = ?, altitude = ?, speed = ?, heart = ?, name = ?, description = ?, updated_at = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [latitude, longitude, altitude, speed, heart, name, description, updated_at, id])
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
            const [rows, fields] = await pool.query("delete from locations where id = ?", [id])
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
