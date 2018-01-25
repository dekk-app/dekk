import {
  GO_TO_PAGE,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  SET_TITLE,
  CLEAR_TITLE
} from '../constants'

export const goToPage = page => {
  return {
    page,
    type: GO_TO_PAGE
  }
}

export const nextPage = () => {
  return {
    type: NEXT_PAGE
  }
}

export const previousPage = () => {
  return {
    type: PREVIOUS_PAGE
  }
}

export const setTitle = title => {
  return {
    title,
    type: SET_TITLE
  }
}

export const clearTitle = () => {
  return {
    type: CLEAR_TITLE
  }
}
