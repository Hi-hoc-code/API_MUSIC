const Composer = require("../model/Composer");

const createComposer = async (req, res) => {
    try {
        const { nameComposer, bioComposer, imgComposer } = req.body;
        console.log(req.body)
        const composer = new Composer({
            nameComposer,
            bioComposer,
            imgComposer
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

const getAllComposer = async (req, res) => {
    try {
        const composers = await Composer.find();
        res.status(200).json(composers);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin tất cả nghệ sĩ" });
    }
};

const getComposerById = async (req, res) => {
    try {
        const { idComposer } = req.body
        const composer = await Composer.findById(idComposer)
        console.log(composer)
        if (!composer) return res.status(404).json({ message: "Không thấy thông tin nghệ sĩ" });
        res.status(200).json(composer);
    } catch (error) {
        res.status(500).json({ message: "Lỗi không thể tìm thấy thông tin nghệ sĩ" });
    }
};

const updateComposer = async (req, res) => {
    try {
        const { id_composer } = req.body;
        if (!id_composer) {
            return res.status(400).json({ message: "ID nghệ sĩ là bắt buộc" });
        }        const updatedComposer = await Composer.findByIdAndUpdate(id_composer, req.body, { new: true });

        if (!updatedComposer) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }

        res.status(200).json({
            message: "Thay đổi thông tin nghệ sĩ thành công",
            updatedComposer
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "ID nghệ sĩ không hợp lệ" });
        }
        res.status(500).json({ message: "Không thể cập nhật nghệ sĩ", error: error.message });
    }
};


const deleteComposer = async (req, res) => {
    try {
        const { id_composer } = req.body;

        const deletedComposer = await Composer.findByIdAndDelete(id_composer);
        console.log(deletedComposer);
        
        if (!deletedComposer) {
            return res.status(404).json({ message: "Không thấy nghệ sĩ" });
        }

        res.status(200).json({ message: "Xóa nghệ sĩ thành công" });
    } catch (error) {
        console.error('Error deleting composer:', error);
        res.status(500).json({ message: "Không thể xóa nghệ sĩ" });
    }
};



module.exports = {
    createComposer,
    getAllComposer,
    getComposerById,
    updateComposer,
    deleteComposer,
};
