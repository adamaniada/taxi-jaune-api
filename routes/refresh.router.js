const express = require("express")
const router = express.Router()

const refreshController = require("../controller/refresh.controller")

router.post('/', refreshController.refresh)

module.exports = router
