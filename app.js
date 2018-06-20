var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var scheduleFunction = require("./functions/schedule");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");
var session = require("express-session");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  session({
    secret: "jeajdklfjl;kadjlkfja;ldjkfj;lajdsfj;ljadlkjfja",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxage: 1000 * 60 * 60 * 24
    }
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);

var hashFunctions = require("./functions/hashes");
// i use this a hash to make password with to use form
hashPromise = hashFunctions.getHash("jelte2001");

//calls scheduler
scheduleFunction();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
