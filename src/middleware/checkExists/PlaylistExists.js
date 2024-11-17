const Playlist = require('../../model/Playlist');
const User = require('../../model/User');

const check_playlist_exists = async (req, res, next) => {
    const { namePlaylist } = req.body;
    const { idUser } = req.query;

    try {
        if (!idUser || !namePlaylist) {
            return res.status(400).json({ message: "Thiếu thông tin idUser hoặc namePlaylist" });
        }

        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const playlistsID = user.playlist;
        const playlists = await Playlist.find({ _id: { $in: playlistsID } });
        const playlistNames = playlists.map(p => p.namePlaylist);
        if (playlistNames.includes(namePlaylist)) {
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
