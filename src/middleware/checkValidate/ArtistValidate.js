const validate_create_artist = (req, res, next) => {
    const { nameArtist, bioArtist } = req.body;
    console.log("Request body:", req.body);
    if (!nameArtist || !bioArtist) {
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" });
    }

    next();
};

module.exports = {
    validate_create_artist
};