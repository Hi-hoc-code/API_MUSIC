const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Album = new Schema({
    nameAlbum: { type: String, require: true },
    releaseDate: { type: Number },
    imgAlbum: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1731951465/null_pztg8k.jpg" },
    artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }]
})

module.exports = mongoose.model('Album', Album)