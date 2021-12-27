const express = require('express');
const devicesController = require('../controllers/devicesController');
const router = express.Router();

router.route("/device_list").get(devicesController.getDevice)
router.route("/device_add").post(devicesController.postDevice)
router.route("/device_update").patch(devicesController.patchDevice)
router.route("/device_delete").delete(devicesController.deleteDevice)

module.exports = router;
