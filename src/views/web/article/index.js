import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

import { translateMarkdown } from '../../../lib'

import './index.scss'
import Loading from '../../../components/helper/Loading'
import Tags from '../Tags'
import { Divider } from 'antd'

@withRouter
class ArticleDetail extends Component {
  state = {
    title: '',
    content: '',
    createdAt: '',
    tags: [],
    categories: [],
    loading: false
  }

  componentDidMount() {
    const id = this.props.match.params.id
    // console.log('aaa', id)
    this.fetchData(id)
  }

  fetchData = id => {
    this.setState({ loading: true })
    this.axios
      .get(`/article/get/${id}`)
      .then(res => {
        console.log('res', res.data)
        const { title, tags, categories, createdAt } = res.data
        const content = translateMarkdown(res.data.content)
        this.setState({
          title,
          content,
          tags,
          categories,
          createdAt,
          loading: false
        })
      })
      .catch(e => {
        console.log('eee')
      })
  }

  render() {
    const { loading, tags, categories, content, title, createdAt } = this.state
    console.log(this.props)
    return (
      <div className="content-inner-wrapper article">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="post-header">
              <h1 className="post-title">{title}</h1>

              <div className="others">
                Posted on
                <span>{createdAt.slice(0, 10)}</span>
                <Tags type="tags" list={tags} />
                <Tags type="categories" list={categories} />
                <Divider type="vertical" />
              </div>
            </div>

            <div
              className="article-detail"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Fragment>
        )}
      </div>
    )
  }
}

export default ArticleDetail
