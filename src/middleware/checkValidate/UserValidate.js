const validate_user_register = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" })
    }
    next();
}
const validate_user_login = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" })
    }
    next();
}
module.exports = {
    validate_user_register,
    validate_user_login
}