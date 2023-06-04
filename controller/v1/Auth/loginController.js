const pool = require("../../database/Config")

const loginController = {
    getById: async (request, response) => {
        try {
            const { id } = request.params
            const { phoneNumber, password } = request.body;
            const [rows, fields] = await pool.query("SELECT * FROM accounts WHERE phoneNumber = ? AND password = ?'", [phoneNumber, password])
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
}

module.exports = postController
