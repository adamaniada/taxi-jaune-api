const express = require("express")
const router = express.Router()

const welcomeController = require("../controller/welcome.controller")

router.get('/', welcomeController.welcome)
router.get('/welcome', welcomeController.authWelcome)

module.exports = router
