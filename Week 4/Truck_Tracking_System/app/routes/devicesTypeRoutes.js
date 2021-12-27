const express = require('express');
const devicesTypeController = require('../controllers/devicesTypeController');
const router = express.Router();

router.route("/type_list").get(devicesTypeController.getDeviceType)
router.route("/type_add").post(devicesTypeController.postDeviceType)
router.route("/type_delete").delete(devicesTypeController.deleteDeviceType)

module.exports = router;
