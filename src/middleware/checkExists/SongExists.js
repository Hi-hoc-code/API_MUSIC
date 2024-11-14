const Song = require("../../model/Song");

const check_song_exists = async (req, res, next) => {
    const { name_song } = req.body;
    const song_exists = await Song.findOne({ name_song });
    if (song_exists) {
        return res.status(400).json({ message: 'bài hát đã tồn tại' });
    }
    next();
};

module.exports = {
    check_song_exists
}