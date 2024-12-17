const express = require("express");
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    getOTP,
    upPremium,
    payment,
    getAllUser,
    getUserById,
    loginadmin,
    updateUserInfo,

} = require("../controller/UserController");
const router = express.Router()
const {
    validate_user_register,
    validate_user_login
} = require("../middleware/checkValidate/UserValidate");
const { check_user_exists } = require("../middleware/checkExists/UserExists");

router.post('/register', validate_user_register, check_user_exists, register);
router.post('/login', validate_user_login, login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.post('/getOTP', getOTP);
router.post('/upPremium', upPremium);
router.post('/payment', payment);   
router.post('/getAllUser', getAllUser)
router.post('/getUserById', getUserById)
router.post('/loginadmin', loginadmin)
router.post('/updateUserInfo',updateUserInfo)

module.exports = router