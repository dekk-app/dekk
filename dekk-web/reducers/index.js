import {GO_TO_PAGE, SLIDE_CONTENT} from '../constants'

export const page = (state = 0, {type, page}) => {
  if (type === GO_TO_PAGE) {
    return page
  }
  return state
}

export const content = (state = {}, {type, item, name, page}) => {
  if (type === SLIDE_CONTENT) {
    const s = {...state}
    s[page] = s[page] || {}
    s[page][name] = s[page][name] || []
    s[page][name].push(item)
    return s
  }
  return state
}

