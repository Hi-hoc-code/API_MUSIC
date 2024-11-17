const Genre = require('../..//model/Genre')
const check_genre_exists = async (req, res, next) => {
    const { nameGenre } = req.body
    const exists_genre = await Genre.findOne({ nameGenre })
    if (!exists_genre) {
        next()
    } else {
        res.status(400).json({ message: "Thể loại đã tồn tại" })
    }
}
module.exports = {
    check_genre_exists
}
