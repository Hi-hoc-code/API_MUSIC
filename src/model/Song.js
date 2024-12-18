const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = new Schema({
    nameSong: { type: String, default: '' },
    imgSong: { type: String, default: '' },
    audio: { type: String, default: '' },
    lyrics: { type: String, default: '' }, // Thêm trường lyrics
    artist: [{ type: Schema.Types.ObjectId, ref: 'Artist', default: [] }],
    composer: [{ type: Schema.Types.ObjectId, ref: 'Composer', default: [] }],
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre', default: [] }],
    playlist: [{ type: Schema.Types.ObjectId, ref: 'Playlist', default: [] }],
    album: [{ type: Schema.Types.ObjectId, ref: 'Album', default: [] }],
    releaseYear: { type: Number, default: null },
    duration: { type: String, default: '' },
    view: { type: Number, default: 0 }
});

module.exports = mongoose.model('Song', Song);
