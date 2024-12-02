const express = require("express");
const router = express.Router();

const userRoutes = require('./UserRoutes');
const artistRoutes = require('./ArtistRoutes');
const composerRoutes = require('./ComposerRoutes');
const albumRoutes = require('./AlbumRoutes');
const genreRoutes = require('./GenreRoutes');
const playlistRoutes = require('./PlaylistRoutes');
const songRoutes = require('./SongRoutes');

router.get('/', (req, res) => {
    res.send(`
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5;">
            <h1 style="color: #007BFF; font-family: Arial, sans-serif; font-size: 3rem;">Music API</h1>
        </div>
    `);
});


router.use('/user', userRoutes);
router.use('/artist', artistRoutes);
router.use('/composer', composerRoutes);
router.use('/album', albumRoutes);
router.use('/genre', genreRoutes);
router.use('/playlist', playlistRoutes);
router.use('/song', songRoutes);

module.exports = router;
