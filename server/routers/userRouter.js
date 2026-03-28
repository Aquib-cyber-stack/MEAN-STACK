const userController = require('../controllers/userController');
const express = require('express');
const auth = require('../middlewares/auth');
const { signUpValidator, loginValidator } = require('../validators/userValidator');
const validate = require('../middlewares/validate');

const router = express.Router();

// ✅ FIX: added validate middleware so validation errors actually get returned
router.post('/signup', signUpValidator, validate, userController.signUp);
router.post('/login', loginValidator, validate, userController.login);
router.post('/logout', auth, userController.logout);

module.exports = router;
