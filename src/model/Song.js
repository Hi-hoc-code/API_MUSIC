const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = new Schema({
    nameSong: String,
    imgSong: String,
    audio: String,
    artist: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
    composer: [{ type: Schema.Types.ObjectId, ref: 'Composer' }],
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    playlist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    album: [{ type: Schema.Types.ObjectId, ref: 'Album' }],
    releaseYear: Number,
    duration: String,
    view: { type: Number, default: 0 }
});

module.exports = mongoose.model('Song', Song);
