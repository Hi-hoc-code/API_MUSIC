const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Composer = new Schema({
    nameComposer: { type: String, require: true },
    bioComposer: { type: String },
    imgComposer: { type: String, default: "https://res.cloudinary.com/dmkyhh1cd/image/upload/v1731951465/null_pztg8k.jpg" }
})

module.exports = mongoose.model('Composer', Composer)