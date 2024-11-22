const Album = require("../model/Album");

const createAlbum = async (req, res) => {
    try {
        const { nameAlbum, releaseDate, artist, imgAlbum } = req.body;
        const album = new Album({
            nameAlbum,
            releaseDate,
            artist,
            imgAlbum
        })
        await album.save();
        res.status(200).json({ message: "Tạo mới album thành công" })
    } catch (error) {
        res.status(500).json({ message: "Lỗi tạo mới album" })
    }
}

const getAllAlbum = async (req, res) => {
    try {
        const albums = await Album.find().populate("artist");
        res.status(200).json({ albums })
     
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin tất cả album" });
    }
};

const getAlbumById = async (req, res) => {
    try {
        const { idAlbum } = req.body
        const album = await Album.findById(idAlbum).populate("artist")
        res.status(200).json(album)
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi lấy thông tin của album" })
    }
}

const updateAlbum = async (req, res) => {
    try {
        const { idAlbum } = req.body;
        const updatedAlbum = await Album.findByIdAndUpdate(idAlbum, req.body, { new: true });
        if (!updatedAlbum) {
            return res.status(404).json({ message: "Album không tồn tại" });
        }

        res.status(200).json({ message: "Cập nhật thông tin album thành công", album: updatedAlbum });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật album" });
    }
};

const deleteAlbum = async (req, res) => {
    try {
        const { idAlbum } = req.body
        const album = await Album.findByIdAndDelete(idAlbum)
        if (album) {
            res.status(200).json({ message: "Xóa album thành công" })
        } else {
            res.status(400).json({ message: "Xóa album thất bại" })
        }

    } catch (error) {
        res.status(500).json({ message: "Lỗi xóa album" })
    }
}

module.exports = {
    createAlbum,
    getAllAlbum,
    getAlbumById,
    updateAlbum,
    deleteAlbum
}
