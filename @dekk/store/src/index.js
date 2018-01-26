import uuid from 'uuid/v4'
import { observable } from 'mobx'

export default class Store {
  id = uuid()
  @observable page
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
    this.page = page
  }

  nextPage() {
    ++this.page
  }

  previousPage() {
    --this.page
  }
}
