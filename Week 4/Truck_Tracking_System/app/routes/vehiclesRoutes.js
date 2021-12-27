const express = require('express');
const vehiclesController = require('../controllers/vehiclesController');
const router = express.Router();

router.route("/vehicle_list").get(vehiclesController.getVehicle)
router.route("/vehicle_add").post(vehiclesController.postVehicle)
router.route("/vehicle_update").patch(vehiclesController.patchVehicle)
router.route("/vehicle_delete").delete(vehiclesController.deleteVehicle)

module.exports = router;
