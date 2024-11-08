const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Album = new Schema({
    name_album: { type: String, require: true },
    releaseDate: { type: Number },
    img_album: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg" },
    artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }]
})

module.exports = mongoose.model('Album', Album)