const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Playlist = new Schema({
    name_playlist: { type: String, require: true },
    img_playlist: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg" },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }]
})
module.exports = mongoose.model('Playlist', Playlist)