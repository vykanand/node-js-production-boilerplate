const express = require('express');
const serverMiddleware = require('../middlewares/server.middleware.js');
const genController = require('../controllers/general.controller.js');
const authController = require('../controllers/auth.controller.js');
const helmet = require('helmet');

var router = express();
// console.log(defaultRoutes.register);
// router.post('/register', serverMiddleware.checkRoute , authController.register)
// router.post('/register', authController.registerUser);

router.route('/gettoken').get(genController.getToken)
router.route('/register')
    .get(serverMiddleware.checkRoute, authController.getUser)
    .post(authController.registerUser);
router.route('/getuser/:id').get(serverMiddleware.checkRoute, authController.getUserbyParam)


router.use(helmet());

module.exports = router;