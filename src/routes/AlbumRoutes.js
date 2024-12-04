const express = require('express');
const { createAlbum, getAllAlbum, getAlbumById, updateAlbum, deleteAlbum } = require('../controller/AlbumController');
const { validate_album_create } = require('../middleware/checkValidate/AlbumValidate');
const { check_album_exists } = require('../middleware/checkExists/AlbumExist');
const router = express.Router();

router.post('/createAlbum', validate_album_create, check_album_exists, createAlbum)
router.get('/getAllAlbum', getAllAlbum)
router.post('/getAlbumById', getAlbumById)
router.post('/updateAlbum', updateAlbum)
router.post('/deleteAlbum', deleteAlbum)

module.exports = router