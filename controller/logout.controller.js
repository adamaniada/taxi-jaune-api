const logoutController = {
    logout: (request, res) => {
        res.cookie('token', '', { maxAge: 0 })
        console.log("Successfully logged out 😏 🍀 -------------------------------------->")
        res.status(200).json({ message: "Successfully logged out 😏 🍀" })
        res.end()
    },
}

module.exports = logoutController
