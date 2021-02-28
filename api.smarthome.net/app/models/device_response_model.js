const sql = require("./db.js");
const DeviceResponse = function(DeviceResponse) {
    this.latest_command = DeviceResponse.latest_command;
    this.data_response = DeviceResponse.data_response;
};
DeviceResponse.update = (command, data, serialnumber, mac_address) => {
    sql.query(
        "UPDATE device_response INNER JOIN devices ON device_response.device_id= devices.id SET device_response.latest_command = ?, device_response.data_response = ? WHERE devices.serialnumber = ? AND devices.mac_address = ?", [command, data, serialnumber, mac_address],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                return;
            }
            if (res.affectedRows == 0) {
                console.log("not found");
                return;
            }
            console.log("updated device response: ", {
                res
            });

        }
    );
};

module.exports = DeviceResponse;