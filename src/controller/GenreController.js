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
        const { id, name, description, image } = req.body;

        console.log("Received request to update genre:", { id, name, description, image });

        if (!id) {
            console.log("Missing genre ID");
            return res.status(400).json({ message: "ID genre là bắt buộc" });
        }

        const genreUpdate = await Genre.findByIdAndUpdate(id, {
            nameGenre: name,
            descriptionGenre: description,
            imgGenre: image
        }, { new: true });
        
        if (!genreUpdate) {
            console.log(`Genre with ID ${id} not found`);
            return res.status(404).json({ message: "Không thấy genre" });
        }

        console.log("Genre updated successfully:", genreUpdate);

        res.status(200).json({
            message: "Thay đổi thông tin genre thành công",
            genreUpdate
        });
    } catch (error) {
        console.error("Error during genre update:", error);

        if (error.kind === 'ObjectId') {
            console.log("Invalid ObjectId format");
            return res.status(400).json({ message: "ID genre không hợp lệ" });
        }

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
