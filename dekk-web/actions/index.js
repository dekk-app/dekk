import {GO_TO_PAGE} from '../constants'

export const goToPage = page => {
  return {
    page,
    type: GO_TO_PAGE
  }
}
