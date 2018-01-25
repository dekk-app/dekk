import {GO_TO_PAGE, SLIDE_CONTENT} from '../constants'

export const goToPage = page => {
  return {
    page,
    type: GO_TO_PAGE
  }
}

export const slideContent = (item, page, name) => {
  return {
    item,
    page,
    name,
    type: SLIDE_CONTENT
  }
}
