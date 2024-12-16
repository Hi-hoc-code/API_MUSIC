const Artist = require('../model/Artist');
const Composer = require('../model/Composer');
const Genre = require('../model/Genre');
const Song = require('../model/Song')
const Album = require('../model/Album')
const mongoose = require('mongoose');
const Playlist = require('../model/Playlist');


const createSong = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const songs = req.body;
        const newSong = new Song({
            nameSong: songs.nameSong,
            imgSong: songs.imgSong,
            audio: songs.audio,
            artist: Array.isArray(songs.artist) ? songs.artist.map(id => new mongoose.Types.ObjectId(id)) : [],
            composer: songs.composer ? [new mongoose.Types.ObjectId(songs.composer)] : [],
            genre: songs.genre ? [new mongoose.Types.ObjectId(songs.genre)] : [],
            playlist: songs.playlist ? [new mongoose.Types.ObjectId(songs.playlist)] : [],
            album: songs.album ? [new mongoose.Types.ObjectId(songs.album)] : [],
            releaseYear: parseInt(songs.releaseYear, 10) || null,
            duration: songs.duration || '',
            view: parseInt(songs.view, 10) || 0
        });

        const savedSong = await newSong.save();
        console.log('SavedSong:', savedSong);

        if (!savedSong) {
            return res.status(400).json({ message: "Lỗi khi tạo mới bài hát" });
        }

        res.status(201).json({ message: "Tạo mới bài hát thành công", newSong: savedSong });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: "Lỗi khi tạo mới bài hát", error: error.message });
    }
}



const getSongArtist = async (req, res) => {
    try {
        const { nameArtist } = req.body;
        const artist = await Artist.findOne({ nameArtist });
        const songs = await Song.find({ artist: artist._id })
            .select("_id nameSong imgSong artist composer audio")
            .populate("artist", "nameArtist imgArtist")  // Artist sẽ là một đối tượng
            .populate("composer", "nameComposer");

        if (!songs || songs.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài hát nào với nghệ sĩ này" });
        }

        res.status(201).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi trong hệ thống" });
    }
};
const getSongGenre = async (req, res) => {
    try {
        const { nameGenre } = req.body;
        const genre = await Genre.findOne({ nameGenre });
        const songs = await Song.find({ genre: genre._id })
            .select("_id nameSong imgSong artist composer audio")
            .populate("artist", "nameArtist imgArtist")
            .populate("composer", "nameComposer");
        if (!songs || songs.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài hát nào với nghệ sĩ này" });
        }
        res.status(201).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi trong hệ thống" });
    }
};
const getSongComposer = async (req, res) => {
    try {
        const { nameComposer } = req.body;
        const composer = await Composer.findOne({ nameComposer });
        const songs = await Song.find({ composer: composer._id })
            .select("_id nameSong imgSong artist composer audio")
            .populate("artist", "nameArtist imgArtist")
            .populate("composer", "nameComposer");
        if (!songs || songs.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài hát nào với tác giả này" });
        }
        res.status(201).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi trong hệ thống" });
    }
};
const getSongAlbum = async (req, res) => {
    try {
        const { nameAlbum } = req.body;
        const album = await Album.findOne({ nameAlbum });
        const songs = await Song.find({ album: album._id })
            .select("_id nameSong imgSong artist composer audio")
            .populate("artist", "nameArtist imgArtist")
            .populate("composer", "nameComposer");
        if (!songs || songs.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài hát nào với album này" });
        }
        res.status(201).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi trong hệ thống" });
    }
};
const getSongPlaylist = async (req, res) => {
    try {
        const { nameGenre } = req.body;
        const genre = await Genre.findOne({ nameGenre });
        const songs = await Song.find({ genre: genre._id })
            .select("_id nameSong imgSong artist composer audio")
            .populate("artist", "nameArtist")
            .populate("composer", "nameComposer");
        if (!songs || songs.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài hát nào với nghệ sĩ này" });
        }
        res.status(201).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi trong hệ thống" });
    }
};
const getAllSong = async (req, res) => {
    try {
        const songs = await Song.find()
            .populate({ path: 'artist', select: 'nameArtist' })
            .populate({ path: 'album', select: 'nameAlbum' })
            .populate({ path: 'genre', select: 'nameGenre' })
            .populate({ path: 'composer', select: 'nameComposer' });
        res.status(201).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách bài hát", error: error.message });
    }
};
const getSongById = async (req, res) => {
    try {
        const { idSong } = req.body;
        const song = await Song.findById(idSong)
            .populate({ path: 'artist', select: 'nameArtist' })
            .populate({ path: 'album', select: 'nameAlbum' })
            .populate({ path: 'genre', select: 'nameGenre' })
            .populate({ path: 'composer', select: 'nameComposer' });

        if (!song) {
            return res.status(404).json({ message: "Song not found." });
        }
        song.view += 1;
        await song.save();
        res.status(201).json({ song });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving song." });
        console.error(error);
    }
}


const updateSong = async (req, res) => {
    try {
        const { idSong, nameSong, releaseDate, artists, imgAlbum, mp3Url, composer, genre, playlist, duration, view } = req.body;
        console.log('Received song data:', { idSong, nameSong, releaseDate, artists, imgAlbum, mp3Url, composer, genre, playlist, duration, view });

        const validatedArtists = Array.isArray(artists) ? artists : [];
        const validatedComposer = Array.isArray(composer) ? composer : [];
        const validatedGenre = Array.isArray(genre) ? genre : [];
        const validatedPlaylist = Array.isArray(playlist) ? playlist : [];

        const updatedSong = await Song.findByIdAndUpdate(idSong, {
            nameSong,
            releaseYear: releaseDate,
            artist: validatedArtists,
            imgSong: imgAlbum,
            audio: mp3Url,
            composer: validatedComposer,
            genre: validatedGenre,
            playlist: validatedPlaylist,
            duration,
            view
        }, { new: true });

        if (!updatedSong) {
            return res.status(404).json({ message: "Không tìm thấy bài hát để cập nhật" });
        }

        res.status(200).json({ message: "Cập nhật bài hát thành công", updatedSong });
    } catch (error) {
        console.error('Error updating song:', error);
        res.status(500).json({ message: "Lỗi khi cập nhật bài hát" });
    }
};



// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

const deleteSong = async (req, res) => {
    try {
        const { idSong } = req.body
        const deleteSong = await Song.findByIdAndDelete(idSong)
        if (!deleteSong) {
            return res.status(400).json({ message: "Lỗi khi xóa bài hát" })
        }
        res.status(201).json({ message: "Xóa bài hát thành công" })
    } catch (error) {
        return res.status(400).json({ error })
    }
}
const searchSong = async (req, res) => {
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

        res.status(201).json({ songs });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while searching for songs." });
        console.error(error);
    }
}
const getSongTop1 = async (req, res) => {
    try {
        const song = await Song.findOne({ view: { $gt: 0 } })
            .sort({ view: -1 })
            .populate({ path: 'artist', select: 'nameArtist' })
            .populate({ path: 'album', select: 'nameAlbum' })
            .populate({ path: 'genre', select: 'nameGenre' })
            .populate({ path: 'composer', select: 'nameComposer' });

        if (!song) {
            return res.status(404).json({ message: "No songs found." });
        }

        res.status(200).json({ song });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving the song with the highest view." });
        console.error(error);
    }
};

// const getSongTrending = async (req, res) => {
//     try {
//         const songs = await Song.find({ view: { $gt: 0 } })
//             .sort({ view: -1 })
//             .limit(15)
//             .populate({ path: 'artist', select: 'nameArtist' })
//             .populate({ path: 'album', select: 'nameAlbum' })
//             .populate({ path: 'genre', select: 'nameGenre' })
//             .populate({ path: 'composer', select: 'name_composer' });

//         res.status(201).json({ songs });
//     } catch (error) {
//         res.status(500).json({ message: "An error occurred while retrieving trending songs." });
//         console.error(error);
//     }
// }
const getSongTrending = async (req, res) => {
    try {
        const songs = await Song.find({ view: { $gt: 0 } })
            .sort({ view: -1 })
            .limit(15)
            .populate({ path: 'artist', select: 'nameArtist imgArtist' })
            .populate({ path: 'album', select: 'nameAlbum' })
            .populate({ path: 'genre', select: 'nameGenre' })
            .populate({ path: 'composer', select: 'nameComposer' });

        // Trả về các đối tượng riêng biệt (không có mảng songs[])
        const response = songs.map(song => ({
            artist: song.artist.length > 0 ? song.artist[0] : {},
            album: song.album.length > 0 ? song.album[0] : {},
            genre: song.genre.length > 0 ? song.genre[0] : {},
            composer: song.composer.length > 0 ? song.composer[0] : {},
            releaseYear: song.releaseYear,
            duration: song.duration,
            imgSong: song.imgSong,
            nameSong: song.nameSong,
            audio: song.audio
        }));

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving trending songs." });
        console.error(error);
    }
}

const addSongFavorite = async (req, res) => {

}
const addSongPlaylist = async (req, res) => {

};

const getSongFavorite = async (req, res) => {

}
const removeSongFavorite = async (req, res) => {

};

module.exports = {
    createSong,
    getSongArtist,
    getSongGenre,
    getSongComposer,
    getSongAlbum,
    getSongPlaylist,
    getAllSong,
    getSongById,
    updateSong,
    deleteSong,
    searchSong,
    getSongTop1,
    getSongTrending,
    getSongFavorite,
    removeSongFavorite,
    addSongFavorite,
    addSongPlaylist
};
