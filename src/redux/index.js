import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'

let storeEnhancers
if (process.env.NODE_ENV === 'production') {
    storeEnhancers = compose(applyMiddleware(thunk))
} else {
    storeEnhancers = compose(composeWithDevTools(applyMiddleware(thunk)))
}

const configureStore = (initialState = {}) => {
    const store = createStore(rootReducer, initialState, storeEnhancers)

    if (module.hot && process.env.NODE_ENV !== 'production') {
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

export default configureStore()