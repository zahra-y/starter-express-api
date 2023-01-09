const express = require('express')
const router = express.Router()
const hashtagsController = require('../controllers/hashtagsController')

router.route('/')
    .get(hashtagsController.getAllHashtags)
    .post(hashtagsController.createNewHashtag)
    .patch(hashtagsController.updateHashtag)
    .delete(hashtagsController.deleteHashtag)

module.exports = router