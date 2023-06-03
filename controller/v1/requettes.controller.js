const pool = require("../../database/Config")

const postController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from requettes")
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
            const [rows, fields] = await pool.query("select * from requettes where id=?", [id])
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
            const { mobile_user_id, taxi_user_id, lieu_depart, lieu_arrive, heure_depart, distance, prix } = req.body
            
            if(!mobile_user_id && !taxi_user_id && lieu_depart && lieu_arrive && heure_depart && distance && prix) {
                return res.sendStatus(400);
            }

            const sql = "insert into requettes (mobile_user_id, taxi_user_id, lieu_depart, lieu_arrive, heure_depart, distance, prix) values (?, ?, ?, ?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, taxi_user_id, lieu_depart, lieu_arrive, heure_depart, distance, prix])
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
            const { mobile_user_id, taxi_user_id, lieu_depart, lieu_arrive, heure_depart, distance, prix } = req.body
            const { id } = req.params
            const sql = "update requettes set mobile_user_id = ?, taxi_user_id = ?, lieu_depart = ?, lieu_arrive = ?, heure_depart = ?, distance = ?, prix = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [mobile_user_id, taxi_user_id, lieu_depart, lieu_arrive, heure_depart, distance, prix, id])
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
            const [rows, fields] = await pool.query("delete from requettes where id = ?", [id])
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
