import { combineReducers } from 'redux'

import common from './common/reducer'
import article from './article/reducer'

export default combineReducers({
    common,
    article
})