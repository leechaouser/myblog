const express = require('express')
const CategoryController = require('../controllers/category')
const router = express.Router({
  mergeParams: true // ?
})

router.post('/create', CategoryController.create)
router.delete('/delete/:id', CategoryController.delete)

module.exports = router