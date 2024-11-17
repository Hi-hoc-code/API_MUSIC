const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Playlist = new Schema({
    namePlaylist: { type: String, require: true },
    imgPlaylist: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg" },
    idUser :{type: Schema.Types.ObjectId, ref:'User'}
})
module.exports = mongoose.model('Playlist', Playlist)