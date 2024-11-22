const express = require('express')
const router = express.Router();
const {
    createComposer,
    getAllComposer,
    getComposerById,
    updateComposer,
    deleteComposer
} = require('../controller/ComposerController');


router.post('/createComposer', createComposer)
router.post('/getAllComposer', getAllComposer)
router.post('/getComposerById', getComposerById)
router.post('/updateComposer', updateComposer)
router.post('/deleteComposer', deleteComposer);

module.exports = router




