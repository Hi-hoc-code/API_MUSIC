const express = require('express')
const router = express.Router();
const cloudinary = require('./../config/cloudinary');
const upload = multer({ dest: 'uploads/' }); 

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      res.json({
        secure_url: result.secure_url,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Error uploading image', error });
    }
  });

module.exports = router




