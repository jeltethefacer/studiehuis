var pool = require("./../db/index");
function StudieHuisLogout(LN) {
  var temp;
  var query = "select * from currently_logged_in where student_number=" + LN;
  return new Promise(function(resolve, reject) {
    pool.query(query, function(error, results, fields) {
      if (error) {
        return reject(err);
        throw error;
      }
      time = results[0].log_in_time;
      stringTime = JSON.stringify(time);
      newTime =
        stringTime.substring(1, 11) + " " + stringTime.substring(12, 20);

      query =
        "insert into clock_in_sessions(student_number, clock_in_id, logged_in_time) values (" +
        results[0].student_number +
        "," +
        results[0].clock_in_id +
        ",'" +
        newTime +
        "')";
      // var d = new Date(
      //   parseInt(newTime.substring(0, 4)),
      //   parseInt(newTime.substring(5, 7)),
      //   parseInt(newTime.substring(8, 10)),
      //   parseInt(newTime.substring(11, 13)),
      //   parseInt(newTime.substring(14, 16)),
      //   parseInt(newTime.substring(17, 19))
      // );

      loggedInTime = Date.now() - Date.parse(time);
      //floors it against cheating
      loggedInTimeMinutes = Math.floor(
        loggedInTime / 1000 / 60 - time.getTimezoneOffset()
      );
      if (loggedInTimeMinutes > 3) {
        loggedInTimeMinutes = 3;
      }

      pool.query(query, function(error, results, fields) {
        if (error) {
          return reject(err);
          throw error;
        }
        query =
          "update student set made_minutes = made_minutes + " +
          loggedInTimeMinutes +
          " where student_number=" +
          LN;
        pool.query(query, function(error, results, fields) {
          if (error) {
            return reject(err);
            throw error;
          }
          query = "delete from currently_logged_in where student_number=" + LN;
          pool.query(query, function(error, results, fields) {
            if (error) {
              return reject(err);
              throw error;
            }
            console.log("dropped", LN);
            resolve();
          });
        });
      });
    });
  });
}

module.exports = StudieHuisLogout;
