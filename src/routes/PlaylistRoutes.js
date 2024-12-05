const express = require('express')
const { createPlaylist, getAllPlaylist, getPlaylistById, deletePlaylist, updatePlaylist } = require('../controller/PlaylistController')
const { validate_playlist_create } = require('../middleware/checkValidate/PlaylistValidate')
const { check_playlist_exists } = require('../middleware/checkExists/PlaylistExists')
const router = express.Router()

router.post('/createPlaylist', validate_playlist_create, check_playlist_exists, createPlaylist)
router.get('/getAllPlaylist', getAllPlaylist)
router.post('/getPlaylistById', getPlaylistById)
router.post('/deletePlaylist', deletePlaylist)
router.post('/updatePlaylist', updatePlaylist)
module.exports = router
