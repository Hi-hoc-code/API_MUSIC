const Song = require("../../model/Song");

const check_song_exists = async (req, res, next) => {
    const { nameSong } = req.body;
    const song_exists = await Song.findOne({ nameSong });
    if (song_exists) {
        return res.status(400).json({ message: 'bài hát đã tồn tại' });
    }
    next();
};

module.exports = {
    check_song_exists
}