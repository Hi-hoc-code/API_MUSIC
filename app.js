const express = require('express')
const dotenv = require('dotenv')

const userRoutes = require('./src/routes/UserRoutes');
const artistRoutes = require('./src/routes/ArtistRoutes')
const composerRoutes = require('./src/routes/ComposerRoutes')
const albumRoutes = require('./src/routes/AlbumRoutes')
const connectDB = require('./src/config/db');
dotenv.config();
const app = express();
app.use(express.json());
connectDB();

app.use('/user', userRoutes)
app.use('/artist', artistRoutes)
app.use('/composer', composerRoutes)
app.use('/album', albumRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
