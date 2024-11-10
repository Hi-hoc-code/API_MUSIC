const mongoose = require('mongoose');
const Playlist = require('../../src/model/Playlist');
const User = require('../model/User');
const Song = require('../../src/model/Song');

const create_playlist = async (req, res) => {
    try {
        const { name_playlist, user_id } = req.body;

        if (!name_playlist || !user_id) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
        }

        const newPlaylist = new Playlist({
            name_playlist,
            user: user_id
        });

        await newPlaylist.save();

        await User.findByIdAndUpdate(user_id, {
            $push: { playlist: newPlaylist._id }
        });

        console.log(newPlaylist);
        res.status(201).json({ message: "Tạo mới playlist thành công!", playlist: newPlaylist });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Lỗi khi tạo mới playlist!" });
    }
};

const get_all_playlist_by_id = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: "Vui lòng cung cấp user_id." });
        }
        const user = await User.findById(user_id).populate('playlist');
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng này." });
        }
        res.json(user.playlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách playlist." });
    }
};

const update_playlist = async (req, res) => {
    try {
        const { user_id, name_playlist, new_songs } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: "Vui lòng cung cấp user_id." });
        }
        if (!name_playlist) {
            return res.status(400).json({ message: "Vui lòng cung cấp tên playlist." });
        }

        const user = await User.findById(user_id).populate('playlist');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const playlist = user.playlist.find(p => p.name_playlist === name_playlist);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found." });
        }

        if (new_songs && Array.isArray(new_songs)) {
            playlist.songs.push(...new_songs);
        }

        await playlist.save();

        res.status(200).json({ message: "Playlist updated successfully.", playlist });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi cập nhật playlist." });
    }
};

const delete_playlist = async (req, res) => {
    try {
        const { user_id, playlist_id } = req.body;

        if (!user_id || !playlist_id) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
        }

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        const playlistIndex = user.playlist.indexOf(playlist_id);

        if (playlistIndex === -1) {
            return res.status(404).json({ message: "Playlist không tồn tại trong tài khoản của người dùng." });
        }

        user.playlist.splice(playlistIndex, 1);
        await user.save();

        await Playlist.findByIdAndDelete(playlist_id);

        res.status(200).json({ message: "Playlist đã được xóa thành công." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi xóa playlist." });
    }
};

const add_song_playlist = async (req, res) => {
    try {
        const { user_id, playlist_id, song_id } = req.body;

        if (!user_id || !playlist_id || !song_id) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
        }

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        const playlist = await Playlist.findById(playlist_id);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist không tồn tại." });
        }

        const song = await Song.findById(song_id);

        if (!song) {
            return res.status(404).json({ message: "Bài hát không tồn tại." });
        }

        playlist.songs.push(song_id); // Add song to playlist
        await playlist.save();

        res.status(200).json({ message: "Bài hát đã được thêm vào playlist." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi thêm bài hát vào playlist." });
    }
};

const delete_song_playlist = async (req, res) => {
    try {
        const { user_id, playlist_id, song_id } = req.body;

        if (!user_id || !playlist_id || !song_id) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
        }

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        const playlist = await Playlist.findById(playlist_id);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist không tồn tại." });
        }

        const songIndex = playlist.songs.indexOf(song_id);

        if (songIndex === -1) {
            return res.status(404).json({ message: "Bài hát không tồn tại trong playlist." });
        }

        playlist.songs.splice(songIndex, 1);
        await playlist.save();

        res.status(200).json({ message: "Bài hát đã được xóa khỏi playlist." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi xóa bài hát khỏi playlist." });
    }
};

module.exports = {
    create_playlist,
    get_all_playlist_by_id,
    add_song_playlist,
    delete_playlist,
    delete_song_playlist,
    update_playlist
};
