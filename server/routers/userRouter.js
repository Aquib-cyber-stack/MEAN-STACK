const userController = require('../controllers/userController');
const express = require('express');
const auth = require('../middlewares/auth');
const { signUpValidator, loginValidator } = require('../validators/userValidator');

const router = express.Router();

router.post('/signup', signUpValidator , userController.signUp);
router.post('/login', loginValidator , userController.login);
router.post('/logout', auth , userController.logout);

module.exports = router;