import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from '../../../redux/article/actions'
import './index.scss'
import { Tag, Badge } from 'antd'

@connect(
  state => ({
    categoryList: state.article.categoryList,
    colorList: state.common.colorList
  }),
  {
    getCategories
  }
)
class Categories extends Component {
  componentDidMount() {
    this.props.getCategories()
  }
  render() {
    // console.log('cate', this.props)
    const { categoryList, colorList } = this.props
    return (
      <div className="categories content-inner-wrapper">
        <h1 className="title">Categories</h1>
        <p className="categories-all-title">{`${categoryList.length} categoires in total`}</p>
        <div className="categories-list">
          {categoryList.map((item, i) => (
            <Badge
             key={item.name}
              style={{ backgroundColor: '#f50', color: 'white' }}
              count={item.count}
              showZero
            >
              <Tag color={colorList[i]}>
                <Link to={`/categories/${item.name}`}>{item.name}</Link>
              </Tag>
            </Badge>
          ))}
        </div>
      </div>
    )
  }
}
export default Categories
