const express = require('express');
const {
    createGenre,
    getAllGenre,
    getGenreById,
    deleteGenre,
    updateGenre,
} = require('../controller/GenreController');
const router = express.Router();
const { validate_genre_create } = require('../middleware/checkValidate/GenreValidate');
const { check_genre_exists } = require('../middleware/checkExists/GenreExists');

router.post('/createGenre', validate_genre_create, check_genre_exists, createGenre);
router.get('/getAllGenre', getAllGenre);
router.post('/getGenreById', getGenreById);
router.delete('/deleteGenre', deleteGenre)
router.put('/updateGenre', updateGenre)
module.exports = router;
