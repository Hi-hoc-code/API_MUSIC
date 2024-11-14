const Playlist = require('../../model/Playlist');
const User = require('../../model/User');

const check_playlist_exists = async (req, res, next) => {
    const { name_playlist } = req.body;
    const { user_id } = req.query;

    try {
        if (!user_id || !name_playlist) {
            return res.status(400).json({ message: "Thiếu thông tin user_id hoặc name_playlist" });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const playlistsID = user.playlist;
        const playlists = await Playlist.find({ _id: { $in: playlistsID } });
        const playlistNames = playlists.map(p => p.name_playlist);
        if (playlistNames.includes(name_playlist)) {
            return res.status(400).json({ message: "Playlist với tên này đã tồn tại" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi kiểm tra playlist" });
    }
};

module.exports = {
    check_playlist_exists
};
