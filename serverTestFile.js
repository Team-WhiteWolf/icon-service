var azure = require('azure');

var path = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
var serviceBusService = azure.createServiceBusService(path);

var message = {
  body: 'Test message',
  customProperties: {
      testproperty: 'TestValue'
  }};
serviceBusService.sendQueueMessage('icon-recieve', message, function(error){
  if(!error){
      console.log("huehue");
  }
});