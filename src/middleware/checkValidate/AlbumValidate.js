const validate_album_create = (req, res, next) => {
    const { name_album, releaseDate, artist } = req.body
    if (!name_album || !releaseDate || !artist) {
        res.status(400).json({ message: "Vui lòng nhập đủ thông tin album" })
    }
    next()
}
module.exports = {
    validate_album_create
}