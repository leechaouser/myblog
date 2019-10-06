import React, { Component } from 'react'

import { Input, Icon } from 'antd'

class Search extends Component {
    render() {
        return (
            <div className="search-box">
                <Icon type="search" className="anticon" />
                <Input
                    type="text"
                    className="header-search"
                    placeholder="搜索文章"
                />
            </div>
        )
    }
}
export default Search