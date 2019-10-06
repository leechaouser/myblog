import React from 'react'
import { Icon, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'

const HeaderLeft = ({ navList }) => {
  const aa = (
    <Menu className="header-nav">
      {navList.map(nav => (
        <Menu.Item key={nav.link} style={{ textAlign: 'center' }}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} style={{ marginRight: 12 }} />}
            <span className="nav-text">{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className="header-left">
      <Icon type="bank" style={{ color: 'rgb(5, 87, 150)', fontSize: 22 }} />
      <span className="blog-name">leech&blog</span>
      <Dropdown
        placement="bottomCenter"
        overlayStyle={{ width: '100%' }}
        trigger={['click']}
        overlay={aa}
      >
        <Icon type="menu" className="nav-phone-icon" />
      </Dropdown>
    </div>
  )
}
export default HeaderLeft
