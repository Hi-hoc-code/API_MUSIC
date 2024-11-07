const express = require("express");
const { register, login, forgot_password, reset_password, get_otp, up_premium, up_avatar, payment } = require("../controller/UserController");
const { validateUserRegister, validateUserLogin } = require("../middleware/checkExists/UserExists");
const { checkUserExists } = require("../middleware/checkValidate/UserValidate");
const upload = require('../middleware/multer')
const router = express.Router()

router.post('/register', validateUserRegister, checkUserExists, register);
router.post('/login', validateUserLogin, login);
router.post('/forgot_password', forgot_password);
router.post('/reset_password', reset_password);
router.post('/get_otp', get_otp);
router.put('/upPremium', up_premium);
router.put('/upAvatar/:id', upload.single('image'), up_avatar);
router.post('/payment', payment);
module.exports = router