import React from 'react'
import './index.scss'

import { Layout, Row, Col } from 'antd'
import HeaderLeft from './headerLeft'
import Nav from './nav'
import Search from './search'

const Header = Layout.Header

const navList = [
    {
        icon: 'home',
        title: 'Home',
        link: '/'
    },
    {
        icon: 'folder',
        title: '分类',
        link: '/categories'
    },
    {
        icon: 'history',
        title: '时间轴',
        link: '/timeline'
    },
    {
        icon: 'user',
        title: '关于',
        link: '/about'
    }
]

const BlogHeader = () => {
    const responseLeft = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24}
    const responseRight = { xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0}
    return (
        <Header className="header-container">
            <Row>
                <Col { ...responseLeft }>
                    <HeaderLeft navList={navList} />
                </Col>
                <Col {...responseRight }>
                    <Search />
                    <Nav navList={navList} />
                </Col>
            </Row>
        </Header>
    )
}

export default BlogHeader