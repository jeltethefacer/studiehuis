var bcrypt = require("bcrypt");
const saltRounds = 10;

function getHash(plaintextPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(plaintextPassword, salt, function(err, hash) {
        console.log(plaintextPassword, "is", hash);
        resolve(hash);
      });
    });
  });
}

function checkPassword(plaintextPassword, hash) {
  //be aware returns promise!!!!!!
  return bcrypt.compare(plaintextPassword, hash);
}

module.exports = {
  getHash: getHash,
  checkPassword: checkPassword
};
