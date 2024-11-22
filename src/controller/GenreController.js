const Genre = require('../../src/model/Genre');

const createGenre = async (req, res) => {
    try {
        const { nameGenre, descriptionGenre , imgGenre} = req.body;
        const new_genre = new Genre({
            nameGenre,
            descriptionGenre,
            imgGenre
        });
        await new_genre.save();
        res.status(201).json({ message: "Tạo mới genre thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo mới genre" });
    }
};

const getAllGenre = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi truy vấn tất cả genre" });
    }
};

const getGenreById = async (req, res) => {
    try {
        const { idGenre } = req.body;
        const genre = await Genre.findById(idGenre);

        if (!genre) {
            return res.status(404).json({ message: "Không tìm thấy genre" });
        }
        res.status(200).json(genre);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy genre"
        });
    }
};

const updateGenre = async (req, res) => {
    try {
        const { id } = req.body;
        const genreUpdate = await Genre.findByIdAndUpdate(id, req.body, { new: true });

        if (!genreUpdate) {
            return res.status(404).json({ message: "Không thấy genre" });
        }

        res.status(200).json({
            message: "Thay đổi thông tin genre thành công",
            genreUpdate
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi cập nhật genre",
            error: error.message
        });
    }
};



const deleteGenre = async (req, res) => {
    try {
        const { genre_id } = req.body
        const genre = await Genre.findByIdAndDelete(genre_id)
        if (!genre) {
            return res.status(404).json({ message: "Không tìm thấy genre" });
        }
        res.status(200).json({ message: "Xóa genre thành công" });
    } catch (error) {
        res.status(400).json({
            message: "Lỗi khi xóa genre"
        });
    }
};

module.exports = {
    createGenre,
    getAllGenre,
    getGenreById,
    deleteGenre,
    updateGenre
};
