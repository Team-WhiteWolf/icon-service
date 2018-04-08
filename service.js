/*jshint esversion: 6 */

const uuidv4 = require('uuid/v4');

const azure = require('azure');

const path = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
const serviceBusService = azure.createServiceBusService(path);

const recieveId = 'icon-recieve'
const sendId = 'icon-send'

function prozessMessage(message) {
    switch(message.type) {
        case "Add_Icon":
            addIcon(message.payload.data, message.payload.name);
            break;
        case "Get_Icon":
            
            break;
    }
    
}

function addIcon(data, filename) {
    var sql = "INSERT INTO Icon (id ,filename, data) VALUES (?, ?, ?);";
    var values = [uuidv4, filename, data];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}

function requestMessage() {
    serviceBusService.recieveQueueMessage(recieveId, handleMessage)
}

function handleMessage(error, recieveMessage) {
    if (error) {
        requestMessage();
        return;
    }

    prozessMessage(recieveMessage);
    requestMessage();
}

var message = {
  body: 'Test message',
  customProperties: {
    testproperty: 'TestValue'
  }
};

/*
serviceBusService.sendQueueMessage(sendId, message, function (error) {
  if (!error) {

  }
});*/