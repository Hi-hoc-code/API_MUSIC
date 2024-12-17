const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true, unique: true },  // Corrected `require` to `required`
    email: { type: String, required: true, unique: true },     // Added unique constraint for email
    password: { type: String, required: true },
    premium: { type: Boolean, default: false },
    otp: { type: Number },
    otpDate: { type: Date },
    playlist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    listenHistory: [{ type: Schema.Types.ObjectId, ref: 'ListenHistory' }],
    imgUser: {
        type: String,
        default: 'https://res.cloudinary.com/dmkyhh1cd/image/upload/v1731951465/null_pztg8k.jpg'
    },
    favoriteSong: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
}, { timestamps: true }); // Correct position for timestamps

module.exports = mongoose.model('User', User);
