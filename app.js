const express = require('express')
const dotenv = require('dotenv')

const userRoutes = require('./src/routes/UserRoutes');
const artistRoutes = require('./src/routes/ArtistRoutes')
const composerRoutes = require('./src/routes/ComposerRoutes')
const albumRoutes = require('./src/routes/AlbumRoutes')
const genreRoutes = require('./src/routes/GenreRoutes')
const playlistRoutes = require('./src/routes/PlaylistRoutes')
const songRoutes = require('./src/routes/SongRoutes')
const connectDB = require('./src/config/db');
dotenv.config();
const app = express();
app.use(express.json());
// const views = require('./src/views')
// // Cấu hình view engine HBS
// app.set('view engine', 'hbs');
// app.set('views', views);
connectDB();

app.use('/user', userRoutes)
app.use('/artist', artistRoutes)
app.use('/composer', composerRoutes)
app.use('/album', albumRoutes)
app.use('/genre', genreRoutes)
app.use('/playlist', playlistRoutes)
app.use('/song', songRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
