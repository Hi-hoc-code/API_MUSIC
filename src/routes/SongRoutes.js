const express = require('express');
const router = express.Router();
const {
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
} = require('../controller/SongController');
const { validate_song } = require('../middleware/checkValidate/SongValidate');
const { check_song_exists } = require('../middleware/checkExists/SongExists');

router.post('/create_song', validate_song, check_song_exists, create_song);
router.get('/get_all_song', get_all_song);
router.get('/get_song_by_id', get_song_by_id);
router.post('/update_song', update_song);
router.post('/delete_song', delete_song);
router.post('/search', get_song_search);
router.post('/by_genre', get_song_by_genre);
router.post('/by_album', get_song_by_album);
router.post('/by_artist', get_song_by_artist);
router.post('/by_composer', get_song_by_composer);
router.get('/get_song_by_trending', get_song_by_trending);
router.post('/favorite_song_user_id', favorite_song_user_id);

module.exports = router;
