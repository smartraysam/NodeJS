const mqtt = require('mqtt');
const DeviceResponse = require('./app/models/device_response_model.js');
class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = 'mqtt://192.158.224.76';
        this.username = 'dav'; // mqtt credentials if these are needed to connect
        this.password = 'pass';
    }

    connect() {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host, {
            username: this.username,
            password: this.password
        });

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
            this.mqttClient.publish('online', "connected to mqtt");

        });

        // mqtt subscriptions
        this.mqttClient.subscribe('gadgets/#', {
            qos: 0
        });

        // When a message arrives, console.log it
        this.mqttClient.on('message', function(topic, message) {
            var message_arr = topic.split("/"); //convert to array	
            var mac_address = message_arr[1];
            var serialnumber = message_arr[2];
            try {
                const datamsg = JSON.parse(message.toString())
                var command = datamsg.command;
                var data_res = datamsg.data;
                DeviceResponse.update(command, data_res, serialnumber, mac_address);
            } catch (err) {
                console.error(err)
            }

        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(message) {
        this.mqttClient.publish('online', message);
    }

}

module.exports = MqttHandler;