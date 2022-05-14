const jwt = require('jsonwebtoken');
const parseToken = require('../utils/parseToken');
require('dotenv').config()

const checkRoute  = function (req, res, next) {

    // console.log(JSON.stringify(req.headers));
    
    if (parseToken.extractToken(req)) {
      
      try{
        var verifytoken = req.headers.authorization.split(' ')[1]
        // console.log(verifytoken);
      jwt.verify(verifytoken, process.env.JWT_SECRET )
       next();
    } catch(err) {
      console.log(err.message);
      res.status(400)
      res.send(err.message)
      next();
    }

     
    }else{
      res.status(400)
      res.send('Access Forbidden.Please Use Authorization Token.')
    }
    
}




module.exports = {
  checkRoute,
};