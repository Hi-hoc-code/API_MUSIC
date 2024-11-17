const express = require("express");
const { register, login, forgot_password, reset_password, get_otp, up_premium, up_avatar, get_all_user, get_user_by_id } = require("../controller/UserController");
const router = express.Router()
const { validate_user_register, validate_user_login } = require("../middleware/checkValidate/UserValidate");
const { check_user_exists } = require("../middleware/checkExists/UserExists");

router.post('/register', validate_user_register, check_user_exists, register);
router.post('/login', validate_user_login, login);
router.post('/forgotPassword', forgot_password);
router.post('/resetPassword', reset_password);
router.post('/getOTP', get_otp);
router.post('/upPremium', up_premium);
// router.post('/payment', payment);
router.post('/getAllUser', get_all_user)
router.post('/get_user_by_id', get_user_by_id)

module.exports = router