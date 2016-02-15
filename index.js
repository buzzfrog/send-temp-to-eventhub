// https://www.npmjs.com/package/eventhubs-js
// http://chancejs.com/

"use strict"

var eventHubs = require('eventhubs-js');
var chance = require('chance').Chance();

// eventhub configurations
var eventHubsNamespace = 'sensortag001',
    eventHubsHubName = 'sensortag',
    eventHubsKeyName = 'sensortag-input',
    eventHubsKey = ''

eventHubs.init({
    hubNamespace: eventHubsNamespace,
    hubName: eventHubsHubName,
    keyName: eventHubsKeyName,
    key: eventHubsKey
});


var numberOfMessagesSend = 0;
var generatedTemperature = chance.floating({min: 18, max:25, fixed:1});

setInterval(function () {
    generatedTemperature += chance.floating({min: -1, max: 1, fixed:1});
    var deviceMessage = {
        sensorName: 'sensor001',
        time: new Date(),
        temperature: generatedTemperature.toFixed(1),
        humidity: chance.floating({min: 60, max:100, fixed:1})
    };
    
    eventHubs.sendMessage({
        message: deviceMessage,
        deviceId: 'sensor001',
    }).then(function() {
        console.log('Message number ' + ++numberOfMessagesSend + " send " + JSON.stringify(deviceMessage) );    
    });
    
}, 1000);

  
