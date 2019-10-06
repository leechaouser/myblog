import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import routes from './routes/config'
import Loading from './components/helper/Loading.js'

import { getWindowWidth } from './redux/common/actions'

import './App.css';

@connect(state => ({
  windowWidth: state.common.windowWidth
}),
{
  getWindowWidth,
})
class Root extends Component {

  componentDidMount() {
    this.props.getWindowWidth()
  }
  /**
   * 根据路由表生成路由组件
   * @param {Array} routes - 路由配置表
   * @param {String} contextPath - 父级路径。 比如后台 admin...
   * 
   */
  renderRoutes(routes, contextPath) {
    const children = []

    const renderRoute = (item, routeContextPath) => {

      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')
      // console.log('newContextPath', newContextPath)

      // if (newContextPath.includes('admin') && this.props.auth !== 1) {
      //   console.log('redirect', this.props.auth)
      //   item = {
      //     ...item,
      //     component: () => <Redirect to="/login" />,
      //     children: []
      //   }
      // }

      if (item.component && item.childRoutes) {
        const childRoutes = this.renderRoutes(item.childRoutes, newContextPath)
        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props}>{childRoutes}</item.component>}
            path={newContextPath}
          />
        )
      } else if (item.component) {
        if (typeof item.component === 'function') {
          children.push(<Route state={item} key={newContextPath} component={item.component} path={newContextPath} exact/>)
        } else {
          children.push(<Route key={newContextPath} component={() => <item.component />} path={newContextPath} exact/>)
        }
      } else if (item.childRoutes) {
        item.childRoutes.forEach(r => renderRoute(r, newContextPath))
      }
    }

    routes.forEach(item => renderRoute(item, contextPath))
    return <Switch>{children}</Switch>
  }
  render() {
    const children = this.renderRoutes(routes, '/')

    return <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </BrowserRouter>
  }
}

export default Root;
