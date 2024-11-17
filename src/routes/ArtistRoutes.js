const express = require('express')
const router = express.Router();
const {
    create_artist,
    get_all_artist,
    get_artist_by_id,
    update_artist,
    delete_artist
} = require('../controller/ArtistController');
const { check_artist_exists } = require('../middleware/checkExists/ArtistExists');
const { validate_create_artist } = require('../middleware/checkValidate/ArtistValidate');

router.post('/create_artist', validate_create_artist, check_artist_exists, create_artist)
router.post('/get_all_artist', get_all_artist)
router.post('/get_artist_by_id', get_artist_by_id)
router.post('/update_artist', update_artist)
router.post('/delete_artist', delete_artist);


module.exports = router