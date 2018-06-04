var mysql = require("mysql");
var keys = require("./../keys/prod");
var connection = mysql.createPool({
  connectionLimit: 10,
  host: keys.db_host,
  user: keys.db_user,
  password: keys.db_password,
  database: keys.db_db,
  timezone: keys.db_timezone
});

module.exports = connection;
