const Artist = require("../../model/Artist");

const check_artist_exists = async (req, res, next) => {
    const { nameArtist } = req.body;
    const artist_exists = await Artist.findOne({ nameArtist });
    if (artist_exists) {
        return res.status(400).json({ message: 'Nghệ sĩ đã tồn tại' });
    }
    next();
};

module.exports = {
    check_artist_exists
}