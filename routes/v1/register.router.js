const express = require("express")
const router = express.Router()

const registerController = require("../../controller/v1/register.controller")

router.get('/', registerController.registerForm)
router.post('/', registerController.register)

module.exports = router
