const express = require("express");
const bodyParser = require("body-parser");
var mqttHandler = require('./mqtt_handler');
const app = express();
var mqttClient = new mqttHandler();
mqttClient.connect();
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// simple route
require("./app/routes/api.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});