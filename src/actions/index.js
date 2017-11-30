import {GO_TO_PAGE, SET_ELEMENT_OFFSET, SET_TITLE} from '../constants'

export const goToPage = page => {
  return {
    page,
    type: GO_TO_PAGE
  }
}

export const setTitle = title => {
  return {
    title,
    type: SET_TITLE
  }
}

export const setElementOffset = (offset, name) => {
  return {
    offset,
    name,
    type: SET_ELEMENT_OFFSET
  }
}
