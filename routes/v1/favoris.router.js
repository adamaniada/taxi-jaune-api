const express = require("express")
const router = express.Router()

const favorisController = require("../../controller/v1/favoris.controller")

router.get('/', favorisController.getAll)
router.get('/:id', favorisController.getById)
router.post('/', favorisController.create)
router.put('/:id', favorisController.update)
router.delete('/:id', favorisController.delete)

module.exports = router
