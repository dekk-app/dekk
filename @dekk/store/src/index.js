import uuid from 'uuid/v4'
import { observable } from 'mobx'

export default class Store {
  id = uuid()
  @observable page = 0
  @observable direction  = 0
  constructor(props) {
    this.page = props.page
    this.title = props.title

    this.setTitle = this.setTitle.bind(this)
    this.clearTitle = this.clearTitle.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  setTitle(title) {
    this.tilte = title
  }

  clearTitle(title) {
    this.tilte = title
  }

  goToPage(page) {
    this.direction = page > this.page ? 1 : -1
    this.page = page
  }

  nextPage() {
    this.goToPage(this.page + 1)
  }

  previousPage() {
    this.goToPage(this.page - 1)
  }
}
