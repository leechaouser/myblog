import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Divider, Icon, Tag } from 'antd'

@connect(state => ({ colorList: state.common.colorList }))
class Tags extends Component {
  static defaultProps = {
    type: 'tags',
    list: []
  }

  render() {
    const { type, list, colorList } = this.props
    return (
      <Fragment>
        <Divider type="vertical" />
        {type === 'tags' ? <Icon type="tags" /> : <Icon type="folder" />}
        {list.map((item, i) => (
          <Tag 
            color={type === 'tags' ? colorList[i] : 'geekblue'}
          key={item.name}>
            <Link to={`/${type}/${item.name}`}>{item.name}</Link>
          </Tag>
        ))}
      </Fragment>
    )
  }
}

export default Tags
