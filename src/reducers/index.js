import {GO_TO_PAGE, SET_ELEMENT_OFFSET} from '../constants'

export const goToPage = (state = {page: 0}, {type, page}) => {
  if (type === GO_TO_PAGE) {
    return {...state, page}
  }
  return state
}


export const setElementOffset = (state = {offset: {}}, {type, offset, name}) => {
  if (type === SET_ELEMENT_OFFSET) {
    return {...state, offset: {
      ...state.offset,
      [name]: offset
    }}
  }
  return state
}

