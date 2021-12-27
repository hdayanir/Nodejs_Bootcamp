const express = require('express');
const logLocationController = require('../controllers/logLocationController');
const router = express.Router();

router.route("/gps_list").get(logLocationController.getGps);
router.route("/gps_add").post(logLocationController.postGps);

module.exports = router;
