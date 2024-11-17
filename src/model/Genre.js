const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Genre = new Schema({
    nameGenre: { type: String, require: true },
    descriptionGenre: { type: String },
    imgGenre: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg" }
})

module.exports = mongoose.model('Genre', Genre)