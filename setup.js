
const mysql = require('mysql2');
var config = {
    host: 'icon-db.mysql.database.azure.com',
    user: 'wolf@icon-db',
    password: 'EJ6chESAmK',
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
            var sql = "DROP DATABASE iconDb;";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });
            sql = [
                "create Database iconDb;",
                "USE iconDb CREATE TABLE `Icon` (`id` varchar(50) NOT NULL, `filename` varchar(50) NOT NULL, `file` TEXT NOT NULL, PRIMARY KEY (`id`));",
            ];
            for (var i in sql) {
                conn.query(i, function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                });
            }

        }
    });

