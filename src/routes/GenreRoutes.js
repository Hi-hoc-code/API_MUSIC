const express = require('express');
const {
    create_genre,
    get_all_genre,
    get_genre_by_id,
    delete_genre,
    up_image_genre, 
    update_genre} = require('../controller/GenreController');
const router = express.Router();
const { validate_genre_create } = require('../middleware/checkValidate/GenreValidate');
const { check_genre_exists } = require('../middleware/checkExists/GenreExists');

router.post('/create_genre', validate_genre_create, check_genre_exists, create_genre);
router.post('/get_all_genre', get_all_genre);
router.post('/get_genre_by_id', get_genre_by_id);
router.post('/delete_genre', delete_genre)
router.post('/update_genre', update_genre)
module.exports = router;
    