// const { Tag: TagModel, Article: ArticleModel, Category: CategoryModel } = require('../models')

const TagModel = require('../models/Tag')
const ArticleModel = require('../models/Article')

module.exports = {
    // 创建标签
    async create(req, res) {
        const { name } = req.body
        const findTag = await TagModel.findOne({ name })
        if (!!findTag) {
          res.send({
            code: 200,
            message: '标签已存在'
          })
        } else {
            const model = await TagModel.create({
                name
              })
              res.send({
                code: 200,
                message: '创建标签成功',
                model
            })
        }
        console.log(findTag)
     
    },
    // 删除标签
    async delete(req, res) {
        await TagModel.findByIdAndDelete(req.params.id)
        res.send({
            code: 200,
            message: '删除标签成功'
        })
    },

    // 获取标签
  async getTags(req, res) {
    const Tags = await TagModel.find().populate('count')
    const data = Tags.map(item => {
      return {
        id: item._id,
        name: item.name,
        count: item.count.length
      }
    })
    return res.send({
      code: 200,
      data
    })
  },

  // 根据标签获取文章
  async getArticlesByTag(req, res) {
    console.log('getArticlesByTag', req.query)
    let { page = 1, pageSize = 15, name } = req.query,
      offset = (page - 1) * pageSize

    pageSize = parseInt(pageSize)
    let responseData = {
      total: 0,
      rows: []
    }
    // 根据 name 找 tag 的 _id
    const tag = await TagModel.findOne({ name })

    await ArticleModel.find()
      .where({ tags: { $in: [`${tag._id}`] } }) // .where('tags').in([`${tag._id}`])
      .count()
      .then(count => {
        responseData.total = count
        ArticleModel.find()
          .where({ tags: { $in: [`${tag._id}`] } })
          .populate(['tags', 'categories'])
          .skip(offset)
          .limit(parseInt(pageSize))
          .then(result => {
            // console.log('result', result)
            responseData.rows = result
            res.send({ responseData })
          })
      })
  }


}
