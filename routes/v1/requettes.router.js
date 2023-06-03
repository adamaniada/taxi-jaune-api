const express = require("express")
const router = express.Router()

const requettesController = require("../../controller/v1/requettes.controller")

router.get('/', requettesController.getAll)
router.get('/:id', requettesController.getById)
router.post('/', requettesController.create)
router.put('/:id', requettesController.update)
router.delete('/:id', requettesController.delete)

module.exports = router
