const Artist = require('../model/Artist')

const create_artist = async (req, res) => {
    try {
        const { name_artist, bio_artist } = req.body
        const artist = new Artist({
            name_artist,
            bio_artist
        })
        await artist.save()
        res.status(200).json({
            message: "Tạo Artist thành công"
        })
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi tạo Artist"
        })
    }
}

const get_all_artist = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin tất cả nghệ sĩ" });
    }
};

const get_artist_by_id = async (req, res) => {
    try {
        const {id} = res.body
        const artist = await Artist.findById(id);
        if (!artist) return res.status(404).json({ message: "Không thấy thông tin nghệ sĩ" });
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin nghệ sĩ" });
    }
};

const update_artist = async (req, res) => {
    try {
        const id_artist = req.body.id;

        const updatedArtist = await Artist.findByIdAndUpdate(id_artist, req.body, { new: true });

        if (!updatedArtist) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }
        res.status(200).json({
            message: "Thay đổi thông tin nghệ sĩ thành công",
            updatedArtist
        });
    } catch (error) {
        res.status(500).json({ message: "Không thể cập nhập nghệ sĩ" });
    }
};

const delete_artist = async (req, res) => {
    try {
        const id_artist = req.body.id;
        const deletedArtist = await Artist.findByIdAndDelete(id_artist);
        if (!deletedArtist) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }
        res.status(200).json({ message: "Xóa nghệ sĩ thành công" });
    } catch (error) {
        res.status(500).json({ message: "Không thể xóa nghệ sĩ" });
    }
};

const up_img_artist = async (req, res) => {
    try {
        const id_artist = req.body.id;
        const artist = await Artist.findById(id_artist);
        if (!artist) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }
        artist.img_artist = req.file.path;
        await artist.save();
        res.status(200).json({ message: "Cập nhập hình ảnh nghệ sĩ thành công", artist });
    } catch (error) {
        res.status(500).json({ message: "Lỗi cập nhập hình ảnh nghệ sĩ" });
    }
};


module.exports = {
    create_artist,
    get_all_artist,
    get_artist_by_id,
    update_artist,
    delete_artist,
    up_img_artist
}
