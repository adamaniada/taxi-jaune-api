const express = require("express")
const router = express.Router()

const notificationsController = require("../../controller/v1/notifications.controller")

router.get('/', notificationsController.getAll)
router.get('/:id', notificationsController.getById)
router.post('/', notificationsController.create)
router.put('/:id', notificationsController.update)
router.delete('/:id', notificationsController.delete)

module.exports = router
