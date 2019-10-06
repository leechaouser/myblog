import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.scss'
import App from './App'
import axios from './lib/axios'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './redux'


// 全局绑定 axios
React.Component.prototype.axios = axios

const render = Component => {
    // console.log('App', App)
    ReactDOM.render(
        <AppContainer>
            <Provider store={store} >
                <Component />
            </Provider>
        </AppContainer>
        ,
        document.getElementById('root')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App.js', () => {
        render(App)
    })
}
