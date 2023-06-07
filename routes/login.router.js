const express = require("express")
const router = express.Router()

const loginController = require("../controller/login.controller")

router.get('/', loginController.loginForm)
router.post('/', loginController.submitLoginData)

module.exports = router
