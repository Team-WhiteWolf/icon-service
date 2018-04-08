/*jshint esversion: 6 */

const azure = require('azure');

const path = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
const serviceBusService = azure.createServiceBusService(path);

const recieveId = 'icon-recieve'
const sendId = 'icon-send'

function prozessMessage(message) {
    //TODO
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