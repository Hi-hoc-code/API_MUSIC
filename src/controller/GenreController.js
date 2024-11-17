const Genre = require('../../src/model/Genre');

const create_genre = async (req, res) => {
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

const get_all_genre = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi truy vấn tất cả genre" });
    }
};

const get_genre_by_id = async (req, res) => {
    try {
        const { genre_id } = req.body;
        const genre = await Genre.findById(genre_id);

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

const update_genre = async (req, res) => {
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



const delete_genre = async (req, res) => {
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
    create_genre,
    get_all_genre,
    get_genre_by_id,
    delete_genre,
    update_genre
};
