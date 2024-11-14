const validate_playlist_create = (req, res, next) => {
    const { name_playlist } = req.body
    const {user_id } = req.query
    if (!name_playlist) {
        return res.status(400).json({ message: "Vui lòng nhập tên của playlist" })
    }
    if (!user_id) {
        return res.status(400).json({ message: "Không tìm thấy id người dùng" })
    }
    next();
}

module.exports = {
    validate_playlist_create
}
