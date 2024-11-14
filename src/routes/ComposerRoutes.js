const express = require('express')
const router = express.Router();
const {
    create_composer,
    get_all_composer,
    get_composer_by_id,
    update_composer,
    delete_composer
} = require('../controller/ComposerController');


router.post('/create_composer', create_composer)
router.get('/get_all_composer', get_all_composer)
router.post('/get_composer_by_id', get_composer_by_id)
router.post('/update_composer', update_composer)
router.post('/delete_composer', delete_composer);

module.exports = router




