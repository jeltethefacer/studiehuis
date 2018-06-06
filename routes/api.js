var express = require("express");
var _ = require("lodash");
var router = express.Router();
var pool = require("./../db/index");
var hashFunction = require("./../functions/hashes");
var StudieHuisLogout = require("./../functions/logout");

router.post("/login", function(req, res) {
  var student = req.body.student;
  var clock_in_id = req.body.clock_in_id;
  d = new Date();
  //checks if the time is right
  if (d.getHours() < 24 && d.getHours() > 0) {
    var query =
      "select * from currently_logged_in where student_number=" + student;
    console.log(student, "requested a login");
    pool.query(query, function(error, results, fields) {
      if (error) {
        res.sendStatus(422);
        throw error;
      }
      //check if the query returned result so yes he is logged in
      //else log user in
      if (results[0]) {
        res.status(409).send("Leerling is al ingelogd");
      } else {
        query =
          "insert into currently_logged_in (student_number, clock_in_id) values(" +
          student +
          "," +
          clock_in_id +
          ")";
        pool.query(query, function(error, results, fields) {
          if (error) {
            res.sendStatus(422);
            throw error;
          }
          res.sendStatus(200);
        });
      }
    });
  } else {
    res.status(409).send("je kan niet inloggen buiten de schooluren.");
  }
});

router.post("/checkLogin", function(req, res) {
  var student = req.body.student;
  var query =
    "select * from currently_logged_in where student_number=" + student;
  console.log(student, "requested check login");
  pool.query(query, function(error, results, fields) {
    if (error) {
      res.sendStatus(422);
      throw error;
    }
    //if query finds a person he is logged in so return a yes
    //else returns a conflict which the front end gets as a no
    if (results[0]) {
      res.sendStatus(200);
    } else {
      res.sendStatus(409);
    }
  });
});

router.post("/logout", function(req, res) {
  var student = req.body.student;
  //promise return  yes if succesfull logout else return error
  StudieHuisLogout(student)
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function() {
      res.sendStatus(422);
    });
});

router.post("/loginCLockin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  query = "select * from clock_in_account where name='" + username + "'";
  pool.query(query, function(error, results) {
    if (error) {
      res.sendStatus(422);
      throw error;
    }
    if (!results[0]) {
      res.sendStatus(409);
    } else {
      hashFunction
        .checkPassword(password, results[0].hash)
        .then(function(correctPasword) {
          if (correctPasword) {
            // takes care of the hash so that the hash doesn't get send to front end
            var resultToSend = _.omit(results[0], "hash");
            res.json(resultToSend);
          } else {
            res.sendStatus(409);
          }
        });
    }
  });
});

router.post("/loginStudent", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  query = "select * from student where student_number = '" + username + "'";
  pool.query(query, function(error, results) {
    if (error) {
      res.sendStatus(422);
      throw error;
    }
    if (!results[0]) {
      res.sendStatus(409);
    } else {
      hashFunction
        .checkPassword(password, results[0].hash)
        .then(function(correctPasword) {
          if (correctPasword) {
            var resultToSend = {
              studentData: _.omit(results[0], "hash"),
              clockInData: []
            };
            query =
              "select * from clock_in_sessions where student_number='" +
              username +
              "'";
            pool.query(query, function(error, results) {
              if (error) {
                //send login anyway withouy the clock in data;
                res.json(resultToSend);
                throw error;
              }
              resultToSend.clockInData = results;
              res.json(resultToSend);
            });
          } else {
            res.sendStatus(409);
          }
        });
    }
  });
});

router.post("/loginMentor", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var jsonToSend = {
    mentorData: {},
    studentsData: []
  };
  query = "select * from mentor where last_name = '" + username + "'";
  pool.query(query, function(error, results) {
    if (error) {
      res.sendStatus(422);
      throw error;
    }
    if (results[0]) {
      hashFunction
        .checkPassword(password, results[0].hash)
        .then(function(correctPasword) {
          if (correctPasword) {
            jsonToSend.mentorData = _.omit(results[0], "hash");
            query =
              "select student.student_number,student.front_name, student.last_name, student.weekly_hours, student.made_minutes, student.should_hours from student inner join mentor_class on student.mentor_class_id = mentor_class.mentor_class_id where mentor_class.mentor_id=" +
              results[0].mentor_id;
            pool.query(query, function(error, results) {
              if (error) {
                res.sendStatus(422);
                throw error;
              }
              jsonToSend.studentsData = results;
              res.json(jsonToSend);
            });
          } else {
            res.status(409).send("gebruikesnaam of wachtwoord niet correct.");
          }
        });
    } else {
      res.status(409).send("gebruikesnaam of wachtwoord niet correct.");
    }
  });
});

router.post("/loginAdmin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var jsonToSend = {
    adminData: {},
    loggedInStudentsData: []
  };
  query = "select * from admin where last_name = '" + username + "'";
  pool.query(query, function(error, results) {
    if (error) {
      res.sendStatus(422);
      throw error;
    }
    if (results[0]) {
      hashFunction
        .checkPassword(password, results[0].hash)
        .then(function(correctPasword) {
          if (correctPasword) {
            jsonToSend.adminData = _.omit(results[0], "hash");
            query = "select * from clock_in_account";
            pool.query(query, function(error, results) {
              if (error) {
                res.sendStatus(422);
                throw error;
              }
              promisesArray = [];
              results.forEach(function(element) {
                promisesArray.push(
                  new Promise(function(resolve, reject) {
                    query =
                      "select student.student_number,student.front_name, student.last_name, student.weekly_hours, student.made_minutes, student.should_hours from student inner join currently_logged_in on student.student_number = currently_logged_in.student_number where currently_logged_in.clock_in_id =" +
                      element.clock_in_id;
                    pool.query(query, function(error, results) {
                      if (error) {
                        reject();
                      }

                      var returnValue = {
                        clockInData: element,
                        studentsData: results
                      };
                      resolve(returnValue);
                    });
                  })
                );
              });
              Promise.all(promisesArray).then(function(values) {
                jsonToSend.loggedInStudentsData = values;
                res.json(jsonToSend);
              });
            });
          }
        });
    } else {
      res.status(409).send("gebruikersnaam of wachtwoord niet correct");
    }
  });
});

module.exports = router;
