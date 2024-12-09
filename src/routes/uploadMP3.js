const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.mp3') {
      return cb(new Error('Chỉ hỗ trợ file định dạng .mp3!'), false);
    }
    cb(null, true);
  },
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Vui lòng chọn file để upload!' });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'audio',      
    });

    res.status(200).json({
      message: 'Upload thành công!',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi upload file!', error: error.message });
  }
});


module.exports = router;
