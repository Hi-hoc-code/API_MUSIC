const validateUserRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" })
    }
    next();
}
const validateUserLogin = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" })
    }
    next();
}
module.exports = {
    validateUserRegister,
    validateUserLogin
}