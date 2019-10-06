import * as constants from '../constants'

export const getWindowWidth = () => {
  const body = document.getElementsByTagName('body')[0]
  // console.log('common', body)
  return { type: constants.COMMON_GET_WINDOW_WIDTH, payload: body.clientWidth }
}

export const openDrawer = () => ({
  type: constants.COMMON_OPEN_DRAWER
})

export const closeDrawer = () => ({
  type: constants.COMMON_CLOSE_DRAWER
})
