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
router.get('/getAllComposer', getAllComposer)
router.post('/getComposerById', getComposerById)
router.put('/updateComposer', updateComposer)
router.delete('/deleteComposer', deleteComposer);

module.exports = router




