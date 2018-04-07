var azure = require('azure');

var path = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
var serviceBusService = azure.createServiceBusService(path);


var message = {
  body: 'Test message',
  customProperties: {
    testproperty: 'TestValue'
  }
};

serviceBusService.sendQueueMessage('icon-recieve', message, function (error) {
  if (!error) {

    database();

  }
});

function database() {

  const mysql = require('mysql2');

  var config =
    {
      host: 'icon-db.mysql.database.azure.com',
      user: 'wolf@icon-db',
      password: 'EJ6chESAmK',
      database: 'icon-db',
      port: 3306,
      ssl: true
    };

  const conn = new mysql.createConnection(config);

  conn.connect(
    function (err) {
      if (err) {
        console.log("!!! Cannot connect !!! Error:");
        throw err;
      }
      else {
        console.log("Connection established.");
        //queryDatabase();
      }
    });
}