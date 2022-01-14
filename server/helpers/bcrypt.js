const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function checkPassword(inputPassword,hashPassword) {
  return bcrypt.compareSync(inputPassword, hashPassword);
}

module.exports = { hashPassword,checkPassword };