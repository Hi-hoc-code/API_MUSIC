const Album = require('../model/Album')
const Artist = require('../model/Artist')

const createArtist = async (req, res) => {
    try {
        const { nameArtist, bioArtist, imgArtist } = req.body
        console.log(req.body)

        const artist = new Artist({
            nameArtist,
            bioArtist,
            imgArtist
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

const getAllArtist = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin tất cả nghệ sĩ" });
    }
};

const getArtistById = async (req, res) => {
    try {
        const { idArtist } = req.body
        const artist = await Artist.findById(idArtist);
        if (!artist) return res.status(404).json({ message: "Không thấy thông tin nghệ sĩ" });
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin nghệ sĩ" });
    }
};

const updateArtist = async (req, res) => {
    try {
        const { artist_id } = req.body;
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
            { $set: { "artists.$[elem].imgArtist": artist.imgArtist } },
            { arrayFilters: [{ "elem._id": artist_id }] }
        );
        if (!updatedAlbums) {
            res.status(400).json({ message: "Không thể cập nhập nghệ sĩ vào album" });
        }
    } catch (error) {
        res.status(500).json({ message: "Không thể cập nhập nghệ sĩ" });
    }
};

const deleteArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArtist = await Artist.findByIdAndDelete(id);
        console.log('delete', deletedArtist);
        

        if (!deletedArtist) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }
        const updatedAlbums = await Album.updateMany(
            { "artists": id },
            { $pull: { artists: { _id: id } } }
        );
        if (updatedAlbums.modifiedCount === 0) {
            return res.status(400).json({ message: "Không thể cập nhật nghệ sĩ vào album" });
        }

        res.status(200).json({ message: "Xóa nghệ sĩ thành công và cập nhật album" });

    } catch (error) {
        console.error('Error deleting artist:', error);
        res.status(500).json({ message: "Không thể xóa nghệ sĩ" });
    }
};


module.exports = {
    createArtist,
    getAllArtist,
    getArtistById,
    updateArtist,
    deleteArtist,
}
