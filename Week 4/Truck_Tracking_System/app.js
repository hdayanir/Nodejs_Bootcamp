const express = require("express");
const app = express();
const devicesRoutes           = require('./app/routes/devicesRoutes');
const devicesTypeRoutes       = require('./app/routes/devicesTypeRoutes');
const logLocationRoutes       = require('./app/routes/logLocationRoutes');
const logTemperatureRoutes    = require('./app/routes/logTemperatureRoutes');
const vehiclesRoutes          = require('./app/routes/vehiclesRoutes');

app.use(express.json());
app.use("/device", devicesRoutes)
app.use("/device_type", devicesTypeRoutes)
app.use("/log_location", logLocationRoutes)
app.use("/log_temperature", logTemperatureRoutes)
app.use ("/vehicle", vehiclesRoutes)

app.listen(5000, () => console.log('UYGULAMA CALISIYOR'));
