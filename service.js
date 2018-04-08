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
            var sqlPayload = sqlLookUp(message.payload.id);
            sendMessage(message.trackingID, message.payload.recipient, message.type);
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

function sqlLookUp(id) {
    var sql = "SELECT * FROM Icon WHERE Icon.id == " + id
}

function sendMessage(id, nextReciever, mType, payload) {
    var message = {
        trackingID: id,
	    sender: "icon-sender",
	    reciever: nextReciever,
	    type: mType,
        payload: payload
      };

    serviceBusService.sendQueueMessage(sendId, message, function (error) {
        if (!error) {
            console.log("it works");
        }
      });
}
