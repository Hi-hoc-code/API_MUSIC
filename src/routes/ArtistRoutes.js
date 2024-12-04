const express = require('express')
const router = express.Router();
const {
    createArtist,
    getAllArtist,
    getArtistById,
    updateArtist,
    deleteArtist
} = require('../controller/ArtistController');
const { check_artist_exists } = require('../middleware/checkExists/ArtistExists');
const { validate_createArtist } = require('../middleware/checkValidate/ArtistValidate');

router.post('/createArtist', validate_createArtist, check_artist_exists, createArtist)
router.get('/getAllArtist', getAllArtist)
router.post('/getArtistById', getArtistById)
router.post('/updateArtist', updateArtist)
router.post('/deleteArtist', deleteArtist);


module.exports = router