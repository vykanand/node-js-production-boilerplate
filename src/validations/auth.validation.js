
const validName = function(name) {
  return /^[A-z ]+$/.test(name);
}

const validEmail = function(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const validPassword = function(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

module.exports = {
  validName,
  validEmail,
  validPassword,
};
