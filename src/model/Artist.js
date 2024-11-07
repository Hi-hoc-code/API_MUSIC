const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Artist = new Schema({
    name_artist: { type: String, require: true },
    bio_artist: { type: String },
    img_artist: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg" }
})

module.exports = mongoose.model('Artist', Artist)