const Album = require('../../model/Album')

const check_album_exists = async (req, res, next) => {
    const { name_album } = req.body
    const album_exists = await Album.findOne({ name_album })
    if (album_exists) {
        return res.status(400).json({
            message: "Album đã tồn tại"
        })
    }
    next()
}
module.exports = {
    check_album_exists
}