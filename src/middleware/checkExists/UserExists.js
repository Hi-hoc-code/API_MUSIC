const User = require("../../model/User");

const check_user_exists = async (req, res, next) => {
    const { username, email } = req.body;
    const existsUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existsUser) {
        return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
    }
    next();
};

module.exports = {
    check_user_exists
}