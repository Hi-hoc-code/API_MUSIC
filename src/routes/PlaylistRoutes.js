const express = require('express')
const {
    create_playlist,
    get_all_playlist_by_id,
    add_song_playlist,
    delete_playlist,
    delete_song_playlist,
    update_playlist
} = require('../controller/PlaylistController')
const { validate_playlist_create } = require('../middleware/checkValidate/PlaylistValidate')
const { check_playlist_exists } = require('../middleware/checkExists/PlaylistExists')
const router = express.Router()

router.post('/create_playlist', validate_playlist_create, check_playlist_exists, create_playlist)
router.post('/get_all_playlist_by_id', get_all_playlist_by_id)
router.post('/add_song_playlist', add_song_playlist)
router.delete('/delete_playlist', delete_playlist)
router.delete('/delete_song_playlist', delete_song_playlist)
router.put('/update_playlist', update_playlist)
module.exports = router