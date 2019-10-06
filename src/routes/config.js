import rootRoutes from './rootRoutes'
import webRoutes from '../views/web/routes'
import adminRoutes from '../views/admin/routes'

const childRoutes = [
    adminRoutes,
    rootRoutes,
    webRoutes,
    
    
    // ...
]

// const isDev = process.env.NODE_ENV === 'development'
// if (isDev) childRoutes.unshift(e)

const routes = [
    ...childRoutes.filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0))
    // {
    //     path: '*',
    //     name: 'Page not found',
    //     component: PageNotFound
    // }
]

/**
 * 过滤路由信息，路由信息中含有 isIndex 的 在渲染
 * 
 * @param {Object} route - 路由对象信息 
 */
function handleIndexRoute(route) {
    if (!route.childRoutes || !rootRoutes.childRoutes.length) return
    const indexRoute = route.childRoutes.find(child => child.isIndex)

    if (indexRoute) {
        const first = {...indexRoute}
        first.path = ''
        first.exact = true
        first.autoIndexRoute = true
        first.childRoutes.unshift(first)
    }
    route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)

export default routes