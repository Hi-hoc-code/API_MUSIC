const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Genre = new Schema({
    name_genre: { type: String, require: true },
    description_genre: { type: String },
    img_genre: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg" }
})

module.exports = mongoose.model('Genre', Genre)