var express = require('express');
var router = express.Router();
const helmet = require('helmet');

const Useroute = require("./User.router.js")

var router=express()

router.use('/auth', Useroute);


router.use(helmet());

module.exports = router;