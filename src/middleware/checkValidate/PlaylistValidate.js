const validate_playlist_create = (req, res, next) => {
    const { namePlaylist } = req.body
    const {idUser } = req.query
    if (!namePlaylist) {
        return res.status(400).json({ message: "Vui lòng nhập tên của playlist" })
    }
    if (!idUser) {
        return res.status(400).json({ message: "Không tìm thấy id người dùng" })
    }
    next();
}

module.exports = {
    validate_playlist_create
}
