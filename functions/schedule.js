//schedules to log everyone out at les end
var schedule = require("node-schedule");
var pool = require("./../db/index");
var logoutFunction = require("./logout");

function scheduleFunction() {
  // end of hour list element corronspondeds with the hour at same place in both arays example minutes[0] and hours[0] is 9:25
  var minutes = [25, 15, 5, 10, 0, 20, 10, 0];
  var hours = [9, 10, 11, 12, 13, 14, 15, 16];
  //test hours
  // var hours = [11, 16, 16];
  // var minutes = [33, 46, 47];
  var job = [];
  //creates array of jobs
  for (var x = 0; x < minutes.length; x++) {
    var rule = new schedule.RecurrenceRule();
    rule.hour = hours[x];
    rule.minute = minutes[x];
    job.push(
      schedule.scheduleJob(rule, function() {
        //this function fetches all people who are logged in and logs them out
        var query = "select * from currently_logged_in";
        pool.query(query, function(error, results, fields) {
          if (error) {
            //TODO make a function that send error to admins
            console.log("Error");
          }
          var promisesArray = [];
          temp = results;
          temp.forEach(function(singleStudent) {
            promisesArray.push(logoutFunction(singleStudent.student_number));
          });

          Promise.all(promisesArray).then(function() {
            console.log("all user logged out");
          });
        });
      })
    );
  }
}
module.exports = scheduleFunction;
