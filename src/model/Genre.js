const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Genre = new Schema({
    nameGenre: { type: String, require: true },
    descriptionGenre: { type: String },
    imgGenre: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1731951465/null_pztg8k.jpg" }
})

module.exports = mongoose.model('Genre', Genre)