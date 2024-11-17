const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Composer = new Schema({
    nameComposer: { type: String, require: true },
    bioCompoer: { type: String },
    imgComposer: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1730959543/image/huz2cjcvhv6a89qwls3l.jpg" }
})

module.exports = mongoose.model('Composer', Composer)