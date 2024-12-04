const Album = require('../../model/Album')

const check_album_exists = async (req, res, next) => {
    const { nameAlbum } = req.body;
    const album_exists = await Album.findOne({ nameAlbum });
    if (album_exists) {
        return res.status(400).json({
            message: "Album đã tồn tại"
        });
    }
    next(); // Proceed to the next middleware if the album doesn't exist
};
module.exports = {
    check_album_exists
};
