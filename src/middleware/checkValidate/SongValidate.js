const validate_song = async (req, res, next) => {
    try {
        const { nameSong, artist, composer, genre, releaseYear } = req.body;
        console.log(req.body)
        if (!nameSong || !artist || !composer || !genre || !releaseYear) {
            return res.status(400).json({ message: "Vui lòng nhập đủ thông tin bài hát" });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: "Lỗi khi xác thực các trường trong bài hát" });
    }
};
module.exports = {
    validate_song
};
