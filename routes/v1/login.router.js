const express = require("express")
const router = express.Router()

const loginController = require("../../controller/v1/login.controller")

router.get('/', loginController.loginForm)
router.post('/', loginController.login)
// router.put('/:id', loginController.update)
// router.delete('/:id', loginController.delete)

module.exports = router
