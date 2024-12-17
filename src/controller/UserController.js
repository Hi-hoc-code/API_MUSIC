const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { default: axios, all } = require('axios');
const Admin = require('../model/Admin');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const getAllUser = async (req, res) => {
    try {
        const all_user = await User.find()
        res.status(200).json(all_user)
    } catch (error) {
        res.status(400).json({ all_user })
    }
}

const getUserById = async (req, res) => {
    try {
        const { idUser } = req.body
        console.log(req.body)
        const user = await User.findById(idUser)
        if (!user) {
            return res.status(400).json({ message: "Không thể tìm thấy user" })
        }
        return res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" })
    }
}
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!", newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, premium: user.premium }, message: "Đăng nhập thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }
        res.status(201).json({ otp: user.otp });
        console.log(user.otp)
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy OTP." });
        console.error(error);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại!" });
        }
        const otp = crypto.randomInt(100000, 999999);
        const otpDate = Date.now() + 60 * 1000;
        user.otp = otp;
        console.log("otp được gửi đến gmail: ", otp)
        user.otpDate = otpDate;
        await user.save();
        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset OTP",
            text: `Mã OTP của bạn là ${otp}. Mã có hiệu lực trong 60 giây.`,
        });
        res.status(201).json({ message: "Mã OTP đã được gửi đến email!" });
        setTimeout(async () => {
            const userWithOtp = await User.findOne({ email });
            console.log(userWithOtp)
            if (userWithOtp && userWithOtp.otpDate <= Date.now()) {
                userWithOtp.otp = '';
                userWithOtp.otpDate = null;
                await userWithOtp.save();
            }
        }, 30 * 1000);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi gửi OTP." });
        console.error(error);
    }
};
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpDate = null;
        await user.save();

        res.status(201).json({ message: "Mật khẩu đã được đặt lại thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi đặt lại mật khẩu." });
        console.error(error);
    }
};
const upAvatar = async (req, res) => {
    try {
        const { imgUser, idUser } = req.body
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }
        user.imgUser = imgUser;
        await user.save();
        res.json({ message: "Cập nhật hình ảnh thành công!", imgUser: user.imgUser });
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật hình ảnh." });
        console.error(error);
    }
};

const upPremium = async (req, res) => {
    res.json({ message: "Updating funtion" })
};
const payment = async (req, res) => {
    try {

    } catch (error) {

    }
}
const updateUserInfo = async (req, res) => {
    try {
        const { idUser, ...fieldsToUpdate } = req.body; // Lấy idUser và các trường còn lại từ req.body

        // Tìm kiếm người dùng dựa trên ID
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }

        // Lặp qua từng trường và cập nhật thông tin
        Object.keys(fieldsToUpdate).forEach((key) => {
            if (fieldsToUpdate[key] !== undefined) {
                user[key] = fieldsToUpdate[key];
            }
        });

        // Lưu thay đổi vào cơ sở dữ liệu
        await user.save();

        res.status(200).json({
            message: "Thông tin người dùng đã được cập nhật thành công!",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật thông tin người dùng." });
    }
};

const loginadmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.' });
        }

        const admin = await Admin.findOne({ username });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
        }
        res.status(200).json({
            message: 'Đăng nhập thành công!',
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    upPremium,
    getOTP,
    upAvatar,
    payment,
    getAllUser,
    getUserById,
    loginadmin,
    updateUserInfo
};
