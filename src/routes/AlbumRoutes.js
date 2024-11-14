const express = require('express');
const {
    create_album,
    get_all_album,
    get_album_by_id,
    update_album,
    delete_album
} = require('../controller/AlbumController');
const { validate_album_create } = require('../middleware/checkValidate/AlbumValidate');
const { check_album_exists } = require('../middleware/checkExists/AlbumExist');
const router = express.Router();

// router.get('/list', get_all_album); 
router.post('/create_album', validate_album_create, check_album_exists, create_album)
router.post('/get_all_album', get_all_album)
router.post('/get_album_by_id', get_album_by_id)
router.post('/update_album', update_album)
router.post('/delete_album', delete_album)

module.exports = router