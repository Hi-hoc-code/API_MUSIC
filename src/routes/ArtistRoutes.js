const express = require('express')
const router = express.Router();
const {
    create_artist,
    get_all_artist,
    get_artist_by_id,
    update_artist,
    up_img_artist,
    delete_artist
} = require('../controller/ArtistController');
const { check_artist_exists } = require('../middleware/checkExists/ArtistExists');
const { validate_create_artist } = require('../middleware/checkValidate/ArtistValidate');
const upload = require('../middleware/multer');
router.post('/create_artist', validate_create_artist, check_artist_exists, create_artist)
router.get('/get_all_artist', get_all_artist)
router.get('/get_artist_by_id/:id', get_artist_by_id)
router.put('/update_artist/:id', update_artist)
router.put('/up_img_artist/:id', upload.single('image'), up_img_artist)
router.delete('/delete_artist/:id', delete_artist);

module.exports = router