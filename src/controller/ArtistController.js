const Artist = require('../model/Artist')

const create_artist = async (req, res) => {
    try {
        const { name_artist, bio_artist, img_artist } = req.body
        console.log(req.body)

        const artist = new Artist({
            name_artist,
            bio_artist,
            img_artist
        })
        await artist.save()
        res.status(200).json({
            message: "Tạo Artist thành công",
            artist
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
        const { artist_id } = req.query
        const artist = await Artist.findById(artist_id);
        if (!artist) return res.status(404).json({ message: "Không thấy thông tin nghệ sĩ" });
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin nghệ sĩ" });
    }
};

const update_artist = async (req, res) => {
    try {
        const { artist_id } = req.query;
        const updatedArtist = await Artist.findByIdAndUpdate(artist_id, req.body, { new: true });
        if (!updatedArtist) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }

        res.status(200).json({
            message: "Thay đổi thông tin nghệ sĩ thành công",
            updatedArtist
        });
        const updatedAlbums = await Album.updateMany(
            { "artists": artist_id },
            { $set: { "artists.$[elem].img_artist": artist.img_artist } },
            { arrayFilters: [{ "elem._id": artist_id }] }
        );
        if (!updatedAlbums) {
            res.status(400).json({ message: "Không thể cập nhập nghệ sĩ vào album" });
        }
    } catch (error) {
        res.status(500).json({ message: "Không thể cập nhập nghệ sĩ" });
    }
};

const delete_artist = async (req, res) => {
    try {
        const { artist_id } = req.query;
        const deletedArtist = await Artist.findByIdAndDelete(artist_id);
        if (!deletedArtist) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }
        res.status(200).json({ message: "Xóa nghệ sĩ thành công" });
        const updatedAlbums = await Album.updateMany(
            { "artists": artist_id },
            { $set: { "artists.$[elem].img_artist": artist.img_artist } },
            { arrayFilters: [{ "elem._id": artist_id }] }
        );
        if (!updatedAlbums) {
            res.status(400).json({ message: "Không thể cập nhập nghệ sĩ vào album" });
        }
    } catch (error) {
        res.status(500).json({ message: "Không thể xóa nghệ sĩ" });
    }
};

module.exports = {
    create_artist,
    get_all_artist,
    get_artist_by_id,
    update_artist,
    delete_artist,
}
