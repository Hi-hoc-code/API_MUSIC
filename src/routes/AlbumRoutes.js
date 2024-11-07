const express = require('express');
const upload = require('../middleware/multer');
const {
    create_album,
    get_all_album,
    get_album_by_id,
    update_album,
    up_image_album,
    delete_album
} = require('../controller/AlbumController');
const router = express.Router();

router.post('/create_album', create_album)
router.get('/get_all_album', get_all_album)
router.get('/get_album_by_id/:id', get_album_by_id)
router.put('/update_album/:id', update_album)
router.put('/up_image_album/:id', upload.single('image'), up_image_album)
router.delete('/delete_album/:id', delete_album)

module.exports = router