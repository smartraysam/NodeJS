const DeviceResponse = require("../models/device_response_model.js");

exports.update = (command, data, serialnumber, mac_address, res) => {
    // Validate Request
    DeviceResponse.update(
        command, data, serialnumber,
        mac_address,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found device with serial number ${serialnumber} and mac address ${mac_address}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating device response with serial number" + serialnumber + " and mac address " + mac_address

                    });
                }
            } else res.send(data);
        }
    );
};