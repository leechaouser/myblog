import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Timeline, Spin } from 'antd'
import BlogPagination from '../../../components/web/pagination'
import './index.scss'
const TimelineList = ({ list, name, type }) => {
  return (
    <div className="timeline">
      <Timeline>
        <Timeline.Item>
          <h1 className="list-title">
            {name}
            <small className="type-name">{type === 'categories' ? 'Category' : 'Tag'}</small>
          </h1>
          <br />
          </Timeline.Item>
          {list.map(item => (
            <Timeline.Item key={item._id}>
              <span style={{ fontSize: '13px', marginRight: '16px'}}>{item.createdAt.slice(5, 10)}</span>
              <Link to={`/article/${item._id}`}>{item.title}</Link>
            </Timeline.Item>
          ))}
        
      </Timeline>
    </div>
  )
}
@withRouter
class List extends Component {
  state = {
    list: [],
    page: 1,
    total: 0,
    type: 'categories',
    name: '',
    loading: false
  }

  componentDidMount() {
    const params = this.decodeQuery(this.props)
    this.setState({ type: params.type }, this.fetchList({ page: 1, ...params }))
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      const params = this.decodeQuery(nextProps)
      this.fetchList({ page: 1, ...params })
    }
  }

  decodeQuery = props => {
    const type = props.location.pathname.includes('categories')
      ? 'categories'
      : 'tags'
    const name = props.match.params.name
    return { type, name }
  }

  fetchList = ({ page = 1, name, type }) => {
    this.setState({ loading: true })
    this.axios
      .get(`/${type}/getArticles`, { params: { page, pageSize: 15, name } })
      .then(res => {
        console.log('res', res)
        const { rows, total } = res.responseData
        this.setState({ list: rows, total, loading: false })
      })
  }

  handlePageChange() {
    console.log('aa')
  }

  render() {
    console.log('aaa', this.props)
    const { list, total, type, loading, page } = this.state
    const { name } = this.props.match.params
    return (
      <div className="content-inner-wrapper list-page">
        <Spin tip="Loading..." spinning={loading}>
          <TimelineList list={list} type={type} name={name} />
        </Spin>
        {list.length < total && (
          <BlogPagination
            current={parseInt(page) || 1}
            onChange={this.handlePageChange}
            total={total}
            pageSize={15}
          />
        )}
      </div>
    )
  }
}
export default List
