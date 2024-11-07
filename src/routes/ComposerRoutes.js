const express = require('express')
const router = express.Router();
const {
    create_composer,
    get_all_composer,
    get_composer_by_id,
    update_composer, up_img_composer, delete_composer } = require('../controller/ComposerController');
const upload = require('../middleware/multer');
router.post('/create_composer', create_composer)
router.get('/get_all_composer', get_all_composer)
router.get('/get_composer_by_id/:id', get_composer_by_id)
router.put('/update_composer/:id', update_composer)
router.put('/up_img_composer/:id', upload.single('image'), up_img_composer)
router.delete('/delete_composer/:id', delete_composer);

module.exports = router




