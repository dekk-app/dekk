import {GO_TO_PAGE, SET_ELEMENT_OFFSET} from '../constants'

export const goToPage = page => {
  return {
    page,
    type: GO_TO_PAGE
  }
}

export const setElementOffset = (offset, name) => {
  return {
    offset,
    name,
    type: SET_ELEMENT_OFFSET
  }
}
