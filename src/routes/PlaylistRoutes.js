const express = require('express')
const {
    create_playlist,
    get_all_playlist,
    delete_playlist,
    update_playlist,
    get_playlist_by_id
} = require('../controller/PlaylistController')
const { validate_playlist_create } = require('../middleware/checkValidate/PlaylistValidate')
const { check_playlist_exists } = require('../middleware/checkExists/PlaylistExists')
const router = express.Router()

router.post('/create_playlist', validate_playlist_create, check_playlist_exists, create_playlist)
router.post('/get_all_playlist', get_all_playlist)
router.post('/get_playlist_by_id', get_playlist_by_id)
router.post('/delete_playlist', delete_playlist)
router.post('/update_playlist', update_playlist)
module.exports = router