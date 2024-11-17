const mongoose = require('mongoose');
const Playlist = require('../../src/model/Playlist');
const User = require('../model/User');
const Song = require('../../src/model/Song');

const create_playlist = async (req, res) => {
    try {
        const { name_playlist, user_id } = req.body;
        const newPlaylist = await new Playlist({ user_id, name_playlist }).save();
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

const get_all_playlist = async (req, res) => {
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
const get_playlist_by_id = async (req, res) => {
    try {
        const { playlist_id } = req.body
        if (!playlist_id) {
            return res.status(400).json({ message: "Lỗi khi lấy playlist" })
        }
        const playlist = await Playlist.findById(playlist_id)
        console.log(playlist)
        res.status(200).json(playlist)
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi lấy playlist" })
    }
}
const update_playlist = async (req, res) => {
    try {
        const { playlist_id } = req.body;
        if (!playlist_id) {
            return res.status(400).json({ message: "Không nhận được id playlist" });
        }
        const updatedPlaylist = await Playlist.findByIdAndUpdate(playlist_id, req.body, { new: true });
        if (!updatedPlaylist) {
            return res.status(404).json({ message: "Không tìm thấy playlist" });
        }
        res.status(200).json({ message: "Playlist updated successfully.", updatedPlaylist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi cập nhật playlist." });
    }
};

const delete_playlist = async (req, res) => {
    try {
        const { playlist_id, user_id } = req.body;
        if (!playlist_id) {
            return res.status(400).json({ message: "Không nhận được id playlist." });
        }
        const playlist = await Playlist.findByIdAndDelete(playlist_id)
        const user = await User.findByIdAndUpdate(
            user_id,
            { $pull: { playlist: playlist_id } },
            { new: true }
        );
        if (!playlist || !user) {
            return res.status(200).json({ message: "Xóa thành công playlist" })
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa playlist." });
    }
};

module.exports = {
    create_playlist,
    get_all_playlist,
    get_playlist_by_id,
    delete_playlist,
    update_playlist
};
