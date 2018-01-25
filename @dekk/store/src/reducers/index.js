import {
  GO_TO_PAGE,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  CLEAR_TITLE,
  SET_TITLE
} from '../constants'

export const page = (state = 0, {type, page}) => {
  switch (type) {
    case GO_TO_PAGE:
      return page
    case NEXT_PAGE:
      return state + 1
    case PREVIOUS_PAGE:
      return state - 1
    default:
      return state
  }
}

export const title = (state = '', {type, title}) => {
  switch (type) {
    case SET_TITLE:
      return title
    case CLEAR_TITLE:
      return ''
    default:
      return state
  }
}
