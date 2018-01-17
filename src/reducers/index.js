import update from 'immutability-helper'
import {GO_TO_PAGE, SET_ELEMENT_OFFSET, SET_TITLE} from '../constants'

export const page = (state = 0, {type, page}) => {
  if (type === GO_TO_PAGE) {
    return page
  }
  return state
}

export const elementOffset = (state = {}, {type, offset, name}) => {
  if (type === SET_ELEMENT_OFFSET) {
    return update(state, {$set: {[name]: offset}})
  }
  return state
}

export const title = (state = '', {type, title}) => {
  if (type === SET_TITLE) {
    return title
  }
  return state
}
