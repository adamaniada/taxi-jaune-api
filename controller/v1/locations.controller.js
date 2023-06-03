const pool = require("../../database/Config")

const postController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from locations")
            // res.json({message: "Get all locations"})
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
            const { user_id, latitude, longitude, altitude, speed, heart, name, description } = req.body
            
            if(!user_id && !latitude && !longitude && !altitude && !speed && !heart && !name && !description) {
                return res.sendStatus(400);
            }

            const sql = "insert into locations (user_id, latitude, longitude, altitude, speed, heart, name, description) values (?, ?, ?, ?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [user_id, latitude, longitude, altitude, speed, heart, name, description])
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
            const { user_id, latitude, longitude, altitude, speed, heart, name, description } = req.body
            const { id } = req.params
            const sql = "update locations set user_id = ?, latitude = ?, longitude = ?, altitude = ?, speed = ?, heart = ?, name = ?, description = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [user_id, latitude, longitude, altitude, speed, heart, name, description, id])
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
