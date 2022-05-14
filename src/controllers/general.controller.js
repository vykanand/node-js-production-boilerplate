const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.getToken = async function (req, res, next) {
    var token = jwt.sign({
      data: 'tokenaccess'
      }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    res.send(token)
}