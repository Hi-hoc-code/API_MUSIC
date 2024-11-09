const express = require("express");
const { register, login, forgot_password, reset_password, get_otp, up_premium, up_avatar, payment } = require("../controller/UserController");
const router = express.Router()
const { validate_user_register, validate_user_login } = require("../middleware/checkValidate/UserValidate");
const { check_user_exists } = require("../middleware/checkExists/UserExists");
const upload = require("../middleware/multer");

router.post('/register', validate_user_register, check_user_exists, register);
router.post('/login', validate_user_login, login);
router.post('/forgot_password', forgot_password);
router.post('/reset_password', reset_password);
router.post('/get_otp', get_otp);
router.put('/upPremium', up_premium);
router.put('/upAvatar', upload.single('image'), up_avatar);
router.post('/payment', payment);

module.exports = router