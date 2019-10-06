import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Drawer, Divider, Empty } from 'antd'
import { openDrawer, closeDrawer } from '../../../redux/common/actions'


import './index.scss'
import Tags from '../Tags'
import Preview from './preview'
import { translateMarkdown, decodeQuery } from '../../../lib'
import BlogPagination from '../../../components/web/pagination'
import Loading from '../../../components/helper/Loading'

const NoDataDesc = ({ keyword}) => (
  <Fragment>
    不存在标题中含有 <span className="keyword">{keyword}</span>的文章！
  </Fragment>
)

@connect(
  state => ({
    drawerVisible: state.common.drawerVisible,
    windowWidth: state.common.windowWidth
  }),
  { openDrawer, closeDrawer }
)
@withRouter
class Home extends Component {
  state = {
    loading: false,
    list: [],
    total: 0
  }
  componentDidMount() {
    const params = decodeQuery(this.props.location.search)
    console.log('params', params)
    this.fetchList(params)
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  fetchList = ({ page, title: keyword }) => {
    this.setState({ loading: true })
    this.axios
      .get('/article/getList', {
        params: { page, pageSize: 10, title: keyword }
      })
      .then(res => {
        console.log('res', res)
        const total = res.responseData.total
        const list = res.responseData.rows
        list.forEach(item => {
          let index = item.content.indexOf('!--more--')
          item.description = translateMarkdown(item.content.slice(0, index))
        })
        this.setState({ loading: false, list, total })
      })
      .catch(e => this.setState({ loading: false }))
  }

  handlePageChange = (page) => {
      document.querySelector('.content-wrapper').scrollTop = 0
      let params = { ...decodeQuery(this.props.location.search), page}
        let url
        Object.entries(params).forEach(item => {
            url = !url ? `?${item[0]}=${item[1]}` : `${url}&${item[0]}=${item[1]}`
        })
        this.setState({ page, current: page }, this.props.history.push(url))
        this.fetchList({ page })
  }

  jumpTo(id) {
      this.props.history.push(`article/${id}`)
  }

  render() {
    console.log('home', this.state)
    const { page, keyword } = decodeQuery(this.props.location.search)
    const { list, total, loading } = this.state
    const { windowWidth, openDrawer, closeDrawer, drawerVisible } = this.props
    return (
      <div className="content-inner-wrapper home-container">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <ul className="ul-list">
              {list.map(item => (
                <li key={item._id} className="ul-list-item">
                  <Divider orientation="left">
                    <span className="title"
                        onClick={() => this.jumpTo(item._id)}
                    >{item.title}</span>
                    <span className="createdTime">
                      {item.createdAt.slice(0, 10)}
                    </span>
                  </Divider>

                  <div
                    className="article-detail description"
                    onClick={() => this.jumpTo(item._id)}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />

                  <div className="others">
                    {/* <Icon type="message" /> */}
                    <Tags type="tags" list={item.tags} />
                    <Tags type="categories" list={item.categories} />
                  </div>
                </li>
              ))}
            </ul>

            {list.length > 0 ? (
              <Fragment>
                {list.length < total && (
                    <BlogPagination 
                        current={parseInt(page) || 1}
                        onChange={this.handlePageChange}
                        total={total}
                    />
                )}
                {windowWidth > 992 ? (
                  <Preview list={list} />
                ) : (
                  <Fragment>
                    <div className="drawer-btn" onClick={openDrawer}>
                      <Icon type="menu" className="" />
                    </div>
                    <Drawer
                      title="文章导航"
                      placement="left"
                      closable={false}
                      onClose={closeDrawer}
                      visible={drawerVisible}
                    >
                      <Preview list={list} />
                    </Drawer>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <div>
                <Empty description={<NoDataDesc keyword={keyword} />} />
              </div>
            )}
          </Fragment>
        )}
      </div>
    )
  }
}
export default Home
