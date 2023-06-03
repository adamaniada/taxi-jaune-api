const express = require("express")
const router = express.Router()

const locationsController = require("../../controller/v1/locations.controller")

router.get('/', locationsController.getAll)
router.get('/:id', locationsController.getById)
router.post('/', locationsController.create)
router.put('/:id', locationsController.update)
router.delete('/:id', locationsController.delete)

module.exports = router
