const express = require('express');
const router = express.Router();

const { signupValidation, loginValidation } = require('../../lib/api_controls');
var userController = require('../../controllers/users_api_controller');

router.post('/register', signupValidation, userController.register);

router.post('/login', loginValidation, userController.login);

router.post('/get-user', userController.getUserData);

module.exports = router;
