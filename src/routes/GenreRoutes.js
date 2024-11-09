const express = require('express');
const {
    create_genre,
    get_all_genre,
    get_genre_by_id,
    delete_genre,
    up_image_genre, 
    update_genre} = require('../controller/GenreController');
const router = express.Router();
const upload = require('../middleware/multer');
const { validate_genre_create } = require('../middleware/checkValidate/GenreValidate');
const { check_genre_exists } = require('../middleware/checkExists/GenreExists');

router.post('/create_genre', validate_genre_create, check_genre_exists, create_genre);
router.get('/get_all_genre', get_all_genre);
router.get('/get_genre_by_id/:id', get_genre_by_id);
router.delete('/delete_genre/:id', delete_genre)
router.put('/up_image_genre/:id', upload.single('image'), up_image_genre)
router.put('/update_genre/:id', update_genre)
module.exports = router;
    