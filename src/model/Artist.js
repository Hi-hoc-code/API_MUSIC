const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Artist = new Schema({
    nameArtist: { type: String, require: true },
    bioArtist: { type: String },
    imgArtist: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1731951465/null_pztg8k.jpg" }
})

module.exports = mongoose.model('Artist', Artist)