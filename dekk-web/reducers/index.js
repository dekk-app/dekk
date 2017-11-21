import {GO_TO_PAGE} from '../constants'

export const page = (state = 0, {type, page}) => {
  if (type === GO_TO_PAGE) {
    return page
  }
  return state
}

