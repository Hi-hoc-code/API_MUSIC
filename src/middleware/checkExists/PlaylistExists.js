const Playlist = require('../..//model/Playlist')
const check_playlist_exists = async (req, res, next) => {
    const { name_playlist } = req.body
    const exists_playlist = await Playlist.findOne({ name_playlist })
    if (!exists_playlist) {
        next()
    } else {
        res.status(400).json({ message: "Playlist đã tồn tại" })
    }
}
module.exports = {
    check_playlist_exists
}
