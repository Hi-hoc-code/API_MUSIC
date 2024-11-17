const mongoose = require('mongoose');
const Playlist = require('../../src/model/Playlist');
const User = require('../model/User');
const Song = require('../../src/model/Song');

const create_playlist = async (req, res) => {
    try {
        const { namePlaylist, idUser } = req.body;
        const newPlaylist = await new Playlist({ idUser, namePlaylist }).save();
        await User.findByIdAndUpdate(idUser, {
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
        const { idUser } = req.body;
        if (!idUser) {
            return res.status(400).json({ message: "Vui lòng cung cấp idUser." });
        }
        const user = await User.findById(idUser).populate('playlist');
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
        const { idPlaylist } = req.body
        if (!idPlaylist) {
            return res.status(400).json({ message: "Lỗi khi lấy playlist" })
        }
        const playlist = await Playlist.findById(idPlaylist)
        console.log(playlist)
        res.status(200).json(playlist)
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi lấy playlist" })
    }
}
const update_playlist = async (req, res) => {
    try {
        const { idPlaylist } = req.body;
        if (!idPlaylist) {
            return res.status(400).json({ message: "Không nhận được id playlist" });
        }
        const updatedPlaylist = await Playlist.findByIdAndUpdate(idPlaylist, req.body, { new: true });
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
        const { idPlaylist, idUser } = req.body;
        if (!idPlaylist) {
            return res.status(400).json({ message: "Không nhận được id playlist." });
        }
        const playlist = await Playlist.findByIdAndDelete(idPlaylist)
        const user = await User.findByIdAndUpdate(
            idUser,
            { $pull: { playlist: idPlaylist } },
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
