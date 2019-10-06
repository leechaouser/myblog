import * as constansts from '../constants'

const dafaultState = {
    windowWidth: 0,
    drawerVisible: false,
    colorList: ['orange', 'volcano', 'cyan', 'magenta', 'red', 'gold', 'lime', 'green', 'blue', 'geekblue', 'purple'], // 标签颜色


}

export const commonReducer = (state = dafaultState, action) => {
    const { type, payload } = action
    switch (type) {
        case constansts.COMMON_GET_WINDOW_WIDTH:
            return { ...state, windowWidth: payload }
        case constansts.COMMON_OPEN_DRAWER:
            return { ...state, drawerVisible: true }
        case constansts.COMMON_CLOSE_DRAWER:
            return { ...state, drawerVisible: false }
        default: 
            return state
    }
}

export default commonReducer