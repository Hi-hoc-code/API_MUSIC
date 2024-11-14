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
        const songs = await Song.find()
            .populate({ path: 'artist', select: 'name_artist' })
            .populate({ path: 'album', select: 'name_album' })
            .populate({ path: 'genre', select: 'name_genre' })
            .populate({ path: 'composer', select: 'name_composer' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving songs." });
        console.error(error);
    }
}

const get_song_by_id = async (req, res) => {
    try {
        const { id_song } = req.query;
        const song = await Song.findById(id_song)
            .populate({ path: 'artist', select: 'name_artist' })
            .populate({ path: 'album', select: 'name_album' })
            .populate({ path: 'genre', select: 'name_genre' })
            .populate({ path: 'composer', select: 'name_composer' });

        if (!song) {
            return res.status(404).json({ message: "Song not found." });
        }
        song.view += 1;
        await song.save();

        // Trả về bài hát sau khi cập nhật
        res.status(200).json({ song });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving song." });
        console.error(error);
    }
}

const update_song = async (req, res) => {
    try {
        const songData = req.body;
        const { id_song } = req.query;

        const updatedSong = await Song.findByIdAndUpdate(id_song, songData, { new: true });
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
        const { id_song } = req.query
        const deleteSong = await Song.findByIdAndDelete(id_song)
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
        const { keyword } = req.query;
        const songs = await Song.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { "artist.name_artist": { $regex: keyword, $options: "i" } },
                { "album.name_album": { $regex: keyword, $options: "i" } },
                { "genre.name_genre": { $regex: keyword, $options: "i" } },
                { "composer.name_composer": { $regex: keyword, $options: "i" } }
            ]
        })
            .populate({ path: 'artist', select: 'name_artist' })
            .populate({ path: 'album', select: 'name_album' })
            .populate({ path: 'genre', select: 'name_genre' })
            .populate({ path: 'composer', select: 'name_composer' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while searching for songs." });
        console.error(error);
    }
}

const get_song_by_genre = async (req, res) => {
    try {
        const { genre_id } = req.query;
        const songs = await Song.find({ genre: genre_id })
            .populate({ path: 'artist', select: 'name_artist' })
            .populate({ path: 'album', select: 'name_album' })
            .populate({ path: 'genre', select: 'name_genre' })
            .populate({ path: 'composer', select: 'name_composer' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving songs by genre." });
        console.error(error);
    }
}
const get_song_by_album = async (req, res) => {

    try {
        const { album_id } = req.query;
        const songs = await Song.find({ album: album_id })
            .populate({ path: 'artist', select: 'name_artist' })
            .populate({ path: 'album', select: 'name_album' })
            .populate({ path: 'genre', select: 'name_genre' })
            .populate({ path: 'composer', select: 'name_composer' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving songs by album." });
        console.error(error);
    }

}

const get_song_by_artist = async (req, res) => {
    try {
        const { artist_id } = req.query;
        const songs = await Song.find({ artist: artist_id })
            .populate({ path: 'artist', select: 'name_artist' })
            .populate({ path: 'album', select: 'name_album' })
            .populate({ path: 'genre', select: 'name_genre' })
            .populate({ path: 'composer', select: 'name_composer' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving songs by artist." });
        console.error(error);
    }
}

const get_song_by_composer = async (req, res) => {
    try {
        const { composer_id } = req.query;
        const songs = await Song.find({ composer: composer_id })
            .populate({ path: 'artist', select: 'name_artist' })
            .populate({ path: 'album', select: 'name_album' })
            .populate({ path: 'genre', select: 'name_genre' })
            .populate({ path: 'composer', select: 'name_composer' });

        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving songs by composer." });
        console.error(error);
    }
}

const get_song_by_trending = async (req, res) => {
    try {
        // Lấy danh sách bài hát có view > 0, sắp xếp theo view giảm dần và giới hạn 10 bài hát
        const songs = await Song.find({ view: { $gt: 0 } })  // Lọc bài hát có view > 0
            .sort({ view: -1 })  // Sắp xếp theo view giảm dần
            .limit(10)  // Lấy 10 bài hát có view cao nhất
            .populate({ path: 'artist', select: 'name_artist' })
            .populate({ path: 'album', select: 'name_album' })
            .populate({ path: 'genre', select: 'name_genre' })
            .populate({ path: 'composer', select: 'name_composer' });

        // Trả về kết quả
        res.status(200).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving trending songs." });
        console.error(error);
    }
}

const favorite_song_user_id = async (req, res) => {

}

module.exports = {
    create_song,
    get_all_song,
    get_song_by_id,
    update_song,
    delete_song,
    get_song_search,
    get_song_by_genre,
    get_song_by_album,
    get_song_by_artist,
    get_song_by_composer,
    get_song_by_trending,
    favorite_song_user_id
}