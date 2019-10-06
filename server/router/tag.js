const express = require('express')
const TagController = require('../controllers/tag')
const router = express.Router({
  mergeParams: true // ?
})

router.post('/create', TagController.create)
router.delete('/delete/:id', TagController.delete)

module.exports = router