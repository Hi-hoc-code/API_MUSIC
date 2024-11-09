const Genre = require('../..//model/Genre')
const check_genre_exists = async (req, res, next) => {
    const { name_genre } = req.body
    const exists_genre = await Genre.findOne({ name_genre })
    if (!exists_genre) {
        next()
    } else {
        res.status(400).json({ message: "Thể loại đã tồn tại" })
    }
}
module.exports = {
    check_genre_exists
}
