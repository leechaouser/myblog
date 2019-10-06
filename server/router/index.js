module.exports = app => {
    const express = require('express')
    const UserController = require('../controllers/user')
    const TagController = require('../controllers/tag')
    const CategoryController = require('../controllers/category')
    const ArticleRouter = require('./article')
    const TagRouter = require('./tag')
    const CateRouter = require('./category')
    const UserRouter = require('./user')
    const router = express.Router({
      mergeParams: true // ?
    })
  
    router.use('/article', ArticleRouter)
    router.use('/user', UserRouter)
    router.use('/tag', TagRouter)
    router.use('/category', CateRouter)
  
    // 获取所有标签以及每个标签的总数
    router.get('/tags/getList', TagController.getTags)
    // 根据标签的名字获取文章
    router.get('/tags/getArticles', TagController.getArticlesByTag)
  
    // 获取所有分类以及分类的总数
    router.get('/categories/getList', CategoryController.getCategories)
    router.get('/categories/getArticles', CategoryController.getArticlesByCate)
  
    // 登录注册
    router.post('/login', UserController.login)
    router.post('/register', UserController.register)
  
    app.use('/', router)
  
    // 错误处理函数
    app.use(async (err, req, res, next) => {
      console.log(err)
      res.send({
        code: err.statusCode || 500,
        message: err.message
      })
    })
  }
  
  
  