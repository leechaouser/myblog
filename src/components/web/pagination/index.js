import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'

@connect(
    state => ({
        windowWidth: state.common.windowWidth
    })
)
class BlogPagination extends Component {
    static defaultProps = {
        pageSize: 10
    }

    render() {
        const { current, total, onChange, pageSize, windowWidth } = this.props
        return (
            <div>
                <Pagination current={current} total={total} onChange={onChange} pageSize={pageSize} simple={windowWidth < 736} />
            </div>
        )
    }
}

export default BlogPagination