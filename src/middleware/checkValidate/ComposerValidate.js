const validate_composer_create = (req, res, next) => {
    const { nameGenre, descriptionGenre } = req.body
    if (!nameGenre || !descriptionGenre) {
        console.log(nameGenre, descriptionGenre)
        return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" })
    }
    next();
}

module.exports = {
    validate_genre_create
}
