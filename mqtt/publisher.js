const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var interval = setInterval( function() {
    sendData()
},2000)

client.on('message', () => {
    console.log('message')
})

function sendData()
{
    client.publish("voltagem", randomInt(110, 220).toString());
    client.publish("temperatura", randomInt(0, 90).toString());
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}