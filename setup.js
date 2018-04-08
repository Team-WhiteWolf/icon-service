
const mysql = require('mysql2');
var config = {
    host: 'ww-data-host.mysql.database.azure.com',
    user: 'database@ww-data-host',
    password: 'uJHeCu3P!',
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
            var sql = "DROP DATABASE IF EXISTS iconDb;";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });
            sql = [
                "CREATE DATABASE iconDb;",
                "USE iconDb CREATE TABLE `Icon` (`id` varchar(50) NOT NULL, `filename` varchar(50) NOT NULL, `file` TEXT NOT NULL, PRIMARY KEY (`id`));"
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

