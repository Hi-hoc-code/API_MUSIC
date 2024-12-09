const express = require('express');
const router = express.Router();
const { createSong, getSongArtist, getSongGenre, getSongComposer, getSongAlbum, getSongPlaylist, getAllSong, getSongById, updateSong, deleteSong, searchSong, getSongTop1, getSongTrending, getSongFavorite, removeSongFavorite, addSongFavorite } = require('../controller/SongController');
const { validate_song } = require('../middleware/checkValidate/SongValidate');
const { check_song_exists } = require('../middleware/checkExists/SongExists');

router.post('/createSong', validate_song, check_song_exists, createSong);
router.post('/getSongArtist', getSongArtist);
router.post('/getSongGenre', getSongGenre);
router.post('/getSongComposer', getSongComposer);
router.post('/getSongAlbum', getSongAlbum);
router.post('/getSongPlaylist', getSongPlaylist);
router.get('/getAllSong', getAllSong);
router.post('/getSongById', getSongById);
router.put('/updateSong', updateSong)
router.delete('/deleteSong', deleteSong)
router.post('/searchSong', searchSong)
router.post('/getSongTop1', getSongTop1)
router.post('/getSongTrending', getSongTrending)
router.post('/getSongFavorite', getSongFavorite)
router.post('/removeSongFavorite', removeSongFavorite)
router.post('/addSongFavorite', addSongFavorite)
module.exports = router;
