const Song = require('../model/Song')
const create_song = async (req, res) => {
    try {
        const songs = req.body;
        const newSong = new Song(songs);

        const savedSong = await newSong.save();

        if (!savedSong) {
            return res.status(400).json({ message: "Lỗi khi tạo mới bài hát" });
        }


        res.status(200).json({ message: "Tạo mới bài hát thành công", newSong: savedSong });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi tạo mới bài hát", error: error.message });
    }
}
const get_all_song = async (req, res) => {
    try {
        const { filters } = req.body;
        const songs = await Song.find(filters)
            .populate({ path: 'artist', select: 'nameArtist' })
            .populate({ path: 'album', select: 'nameArtist' })
            .populate({ path: 'genre', select: 'nameArtist' })
            .populate({ path: 'composer', select: 'nameArtist' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách bài hát", error: error.message });
    }
};
const get_song_by_id = async (req, res) => {
    try {
        const { idSong } = req.body;
        const song = await Song.findById({ idSong })
            .populate({ path: 'artist', select: 'nameArtist' })
            .populate({ path: 'album', select: 'nameAlbum' })
            .populate({ path: 'genre', select: 'nameGenre' })
            .populate({ path: 'composer', select: 'nameComposer' });

        if (!song) {
            return res.status(404).json({ message: "Song not found." });
        }
        song.view += 1;
        await song.save();
        res.status(200).json({ song });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving song." });
        console.error(error);
    }
}
const update_song = async (req, res) => {
    try {
        const { idSong, songData } = req.body;

        const updatedSong = await Song.findByIdAndUpdate(idSong, songData, { new: true });
        if (!updatedSong) {
            return res.status(404).json({ message: "Không tìm thấy bài hát để cập nhật" });
        }
        res.status(200).json({ message: "Cập nhật bài hát thành công", updatedSong });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật bài hát" });
        console.error(error);
    }
};
const delete_song = async (req, res) => {
    try {
        const { idSong } = req.body
        const deleteSong = await Song.findByIdAndDelete(idSong)
        if (!deleteSong) {
            return res.status(400).json({ message: "Lỗi khi xóa bài hát" })
        }
        res.status(200).json({ message: "Xóa bài hát thành công" })
    } catch (error) {
        return res.status(400).json({ error })
    }
}
const get_song_search = async (req, res) => {
    try {
        const { keyword } = req.body;
        const songs = await Song.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { "artist.nameArtist": { $regex: keyword, $options: "i" } },
                { "album.nameAlbum": { $regex: keyword, $options: "i" } },
                { "genre.nameGenre": { $regex: keyword, $options: "i" } },
                { "composer.name_composer": { $regex: keyword, $options: "i" } }
            ]
        })
            .populate({ path: 'artist', select: 'nameArtist' })
            .populate({ path: 'album', select: 'nameAlbum' })
            .populate({ path: 'genre', select: 'nameGenre' })
            .populate({ path: 'composer', select: 'name_composer' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while searching for songs." });
        console.error(error);
    }
}
const get_song_by_trending = async (req, res) => {
    try {
        const songs = await Song.find({ view: { $gt: 0 } })
            .sort({ view: -1 })
            .limit(10)
            .populate({ path: 'artist', select: 'nameArtist' })
            .populate({ path: 'album', select: 'nameAlbum' })
            .populate({ path: 'genre', select: 'nameGenre' })
            .populate({ path: 'composer', select: 'name_composer' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving trending songs." });
        console.error(error);
    }
}
const favorite_song_idUser = async (req, res) => {
    try {
        const { userId, songId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ message: "Bài hát không tồn tại" });
        }
        if (user.favoriteSong.includes(songId)) {
            return res.status(400).json({ message: "Bài hát đã có trong danh sách ưa thích" });
        }
        user.favoriteSong.push(songId);
        await user.save();
        res.status(200).json({ message: "Thêm bài hát vào danh sách ưa thích thành công", favoriteSongs: user.favoriteSong });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm bài hát vào danh sách ưa thích", error: error.message });
    }
}
const remove_favorite_song_idUser = async (req, res) => {
    try {
        const { userId, songId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        if (!user.favoriteSong.includes(songId)) {
            return res.status(400).json({ message: "Bài hát không có trong danh sách ưa thích" });
        }
        user.favoriteSong = user.favoriteSong.filter(id => id.toString() !== songId);
        await user.save();

        res.status(200).json({ message: "Xóa bài hát khỏi danh sách ưa thích thành công", favoriteSongs: user.favoriteSong });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa bài hát khỏi danh sách ưa thích", error: error.message });
    }
};

module.exports = {
    create_song,
    get_all_song,
    get_song_by_id,
    update_song,
    delete_song,
    get_song_search,
    get_song_by_trending,
    favorite_song_idUser
}