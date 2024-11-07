const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Composer = new Schema({
    name_composer: { type: String, require: true },
    bio_composer: { type: String },
    img_composer: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg" }
})

module.exports = mongoose.model('Composer', Composer)