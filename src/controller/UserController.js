const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { default: axios } = require('axios');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.query;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, premium: user.premium }, message: "Đăng nhập thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const get_otp = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }
        res.json({ otp: user.otp });
        console.log(user.otp)
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy OTP." });
        console.error(error);
    }
};
// opt: { type: String, default: '' },
// optDate: { type: Date },
const forgot_password = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại!" });
        }
        // Tạo mã OTP và thiết lập thời gian hết hạn là 30 giây
        const otp = crypto.randomInt(100000, 999999);
        const otpDate = Date.now() + 30 * 1000; // 30 giây

        user.otp = otp;
        user.otpDate = otpDate;
        await user.save();

        console.log(user)
        // Gửi email OTP
        await transporter.sendMail({
            to: email,
            subject: "Password Reset OTP",
            text: `Mã OTP của bạn là ${otp}. Mã có hiệu lực trong 30 giây.`,
        });

        res.json({ message: "Mã OTP đã được gửi đến email!" });

        // Tự động xoá OTP sau 30 giây
        setTimeout(async () => {
            const userWithOtp = await User.findOne({ email });
            if (userWithOtp && userWithOtp.otpExpires <= Date.now()) {
                userWithOtp.otp = '';
                userWithOtp.otpExpires = null;
                await userWithOtp.save();
            }
        }, 30 * 1000);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi gửi OTP." });
        console.error(error);
    }
};


const reset_password = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng với email này." });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = null;
        user.otpDate = null;
        await user.save();

        res.json({ message: "Mật khẩu đã được đặt lại thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi đặt lại mật khẩu." });
        console.error(error);
    }
};

const up_avatar = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại!" });
        }
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "Tệp hình ảnh không được tìm thấy." });
        }
        // Cập nhật hình ảnh cho người dùng
        user.imgUser = req.file.path;
        await user.save()
        // Trả về thông tin người dùng sau khi cập nhật hình ảnh
        res.json({ message: "Cập nhật hình ảnh thành công!", imgUser: user.imgUser })
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật hình ảnh." });
        console.error(error);
    }
};


const up_premium = async (req, res) => {
    res.json({ message: "Updating funtion" })
};
const payment = async (req, res) => {
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var requestType = "payWithMethod";
    var amount = '50000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

    // Create the signature
    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });

    const option = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            "Content-Type": "application/json"
        },
        data: requestBody
    };

    try {
        const result = await axios(option);
        return res.status(200).json(result.data);
    } catch (error) {
        console.error("MoMo API error:", error.response ? error.response.data : error.message);
        return res.status(500).json({
            statusCode: 500,
            message: "Server error",
            details: error.response ? error.response.data : error.message,
        });
    }
};

module.exports = {
    register,
    login,
    forgot_password,
    reset_password,
    up_premium,
    get_otp,
    up_avatar,
    payment
};
