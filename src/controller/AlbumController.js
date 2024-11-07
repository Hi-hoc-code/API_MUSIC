const Album = require("../model/Album");
const { param } = require("../routes/ArtistRoutes");

const create_album = async (req, res) => {
    try {
        const { name_album, releaseDate, artist } = req.body;
        const artists = Array.isArray(artist) ? artist : [artist];
        const album = new Album({
            name_album,
            releaseDate,
            artist: artists
        })
        await album.save();
        res.status(500).json({ message: "Tạo mới album thành công" })
    } catch (error) {
        res.status(500).json({ message: "Lỗi tạo mới album" })
    }
}

const get_all_album = async (req, res) => {
    try {
        const album = await Album.find().populate("artist");
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin tất cả album" });
    }
}

const get_album_by_id = async (req, res) => {
    try {
        const id_album = req.params.id
        const album = await Album.findById(id_album).populate("artist")
        res.status(200).json(album)
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi lấy thông tin của album" })
    }
}

const update_album = async (req, res) => {
    try {
        const id_album = req.params.id;
        const { name_album, releaseDate, artist } = req.body;
        const artists = Array.isArray(artist) ? artist : [artist];

        const updatedAlbum = await Album.findByIdAndUpdate(
            id_album,
            { name_album, releaseDate, artist: artists },
            { new: true }
        );

        if (!updatedAlbum) {
            return res.status(404).json({ message: "Album không tồn tại" });
        }

        res.status(200).json({ message: "Cập nhật thông tin album thành công", album: updatedAlbum });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật album" });
    }
};

const up_image_album = async (req, res) => {
    try {
        const id_album = req.params.id;
        const album = await Album.findById(id_album);
        if (!album) {
            return res.status(404).json({ message: "Album không tồn tại" });
        }
        album.id_album = req.file.path;
        await artist.save();
        res.status(200).json({ message: "Cập nhập hình ảnh album thành công", artist });
    } catch (error) {
        res.status(500).json({ message: "Lỗi cập nhập hình ảnh album" });
    }
}

const delete_album = async (req, res) => {
    try {
        const id_album = req.params.id
        const album = await Album.findByIdAndDelete(id_album)
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
    create_album,
    get_all_album,
    get_album_by_id,
    update_album,
    up_image_album,
    delete_album
}
