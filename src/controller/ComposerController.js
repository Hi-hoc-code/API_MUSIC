const Composer = require("../model/Composer");

const create_composer = async (req, res) => {
    try {
        const { name_composer, bio_composer } = req.body;
        const composer = new Composer({
            name_composer,
            bio_composer
        });
        await composer.save();
        res.status(200).json({
            message: "Tạo composer thành công"
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi tạo composer"
        });
    }
};

const get_all_composer = async (req, res) => {
    try {
        const composers = await Composer.find();
        res.status(200).json(composers);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin tất cả nghệ sĩ" });
    }
};

const get_composer_by_id = async (req, res) => {
    try {
        const id_composer = req.body
        const composer = await Composer.findById(id_composer);
        if (!composer) return res.status(404).json({ message: "Không thấy thông tin nghệ sĩ" });
        res.status(200).json(composer);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin nghệ sĩ" });
    }
};

const update_composer = async (req, res) => {
    try {
        const id_composer = req.body.id;
        const updatedComposer = await Composer.findByIdAndUpdate(id_composer, req.body, { new: true });
        if (!updatedComposer) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }
        res.status(200).json({
            message: "Thay đổi thông tin nghệ sĩ thành công",
            updatedComposer
        });
    } catch (error) {
        res.status(500).json({ message: "Không thể cập nhập nghệ sĩ" });
    }
};

const delete_composer = async (req, res) => {
    try {
        const id_composer = req.body.id;
        const deletedComposer = await Composer.findByIdAndDelete(id_composer);
        if (!deletedComposer) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }F
        res.status(200).json({ message: "Xóa nghệ sĩ thành công" });
    } catch (error) {
        res.status(500).json({ message: "Không thể xóa nghệ sĩ" });
    }
};

const up_img_composer = async (req, res) => {
    try {
        const id_composer = req.body.id;
        const composer = await Composer.findById(id_composer); F
        if (!composer) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }
        composer.img_composer = req.file.path;
        await composer.save();
        res.status(200).json({ message: "Cập nhập hình ảnh nghệ sĩ thành công", composer });
    } catch (error) {
        res.status(500).json({ message: "Lỗi cập nhập hình ảnh nghệ sĩ" });
    }
};

module.exports = {
    create_composer,
    get_all_composer,
    get_composer_by_id,
    update_composer,
    delete_composer,
    up_img_composer
};
