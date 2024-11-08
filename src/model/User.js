const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    premium: { type: Boolean, default: false },
    otp: { type: Number },
    otpDate: { type: Date },
    playlist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    favoriteSong: [{ type: Schema.Types.ObjectId, ref: 'FavoriteSong' }],
    playlist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    listenHistory: [{ type: Schema.Types.ObjectId, ref: 'ListenHistory' }],
    imgUser: { type: String, default: 'https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg' }
})

module.exports = mongoose.model('User', User)