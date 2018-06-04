var express = require("express");
var path = require("path");
var router = express.Router();

/* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });
//serves the build version of the react front end
router.use(express.static(path.join(__dirname, "./../client/build")));

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./../client/build", "index.html"));
});

module.exports = router;
