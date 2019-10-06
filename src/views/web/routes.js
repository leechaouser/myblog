import React from 'react'
 
import Layout from '../../components/web/layout'
import PageNotFount from '../../components/NotFount'

import Home from './home'
import Article from './article'
// import Img from './img'
import Categories from './categories'
import List from './list'
import About from './about'

// const Home = React.lazy(() => import('./home'));
const BlogTimeline = React.lazy(() => import('./timeline'));
// const Category = React.lazy(() => import('./category'));
// const About = React.lazy(() => import('./about'));

export default {
    path: '/',
    name: 'home',
    component: Layout,
    childRoutes: [
        { path: '', component: Home },
        { path: 'article/:id', component: Article },
        { path: 'categories', component: Categories },
        { path: 'categories/:name', component: List },
        { path: 'timeline', component: BlogTimeline },
        { path: 'about', component: About },
        { path: '*', component: PageNotFount }
    ]
}