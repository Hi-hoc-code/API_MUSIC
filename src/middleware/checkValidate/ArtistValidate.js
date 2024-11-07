const validate_create_artist = (req, res, next) => {
    const { name_artist, bio_artist } = req.body;
    if (!name_artist || !bio_artist) {
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" })
    }
    next();
}

module.exports = {
    validate_create_artist
}