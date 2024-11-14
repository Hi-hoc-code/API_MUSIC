const validate_composer_create = (req, res, next) => {
    const { name_genre, description_genre } = req.body
    if (!name_genre || !description_genre) {
        console.log(name_genre, description_genre)
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" })
    }
    next();
}

module.exports = {
    validate_genre_create
}
