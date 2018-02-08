import uuid from 'uuid/v4'
import {observable} from 'mobx'

export default class Store {
  id = uuid()
  @observable page = 0
  @observable fragment = 0
  @observable fragmentCount = 0
  @observable direction = 0
  constructor(props) {
    this.page = props.page
    this.fragmentHosts = props.fragmentHosts
    this.title = props.title

    this.setTitle = this.setTitle.bind(this)
    this.clearTitle = this.clearTitle.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.goToFragment = this.goToFragment.bind(this)
    this.nextFragment = this.nextFragment.bind(this)
    this.previousFragment = this.previousFragment.bind(this)
  }

  setTitle(title) {
    this.tilte = title
  }

  clearTitle(title) {
    this.tilte = title
  }

  goToPage(n) {
    this.direction = n > this.page ? 1 : -1
    this.page = n
  }

  nextPage() {
    this.goToPage(this.page + 1)
  }

  previousPage() {
    this.goToPage(this.page - 1)
  }

  goToFragment(n) {
    const m = this.fragmentHosts[this.page][n]
    this.fragment = m
    this.fragmentCount = n
  }

  nextFragment() {
    this.goToFragment(this.fragmentCount + 1)
  }

  previousFragment() {
    this.goToFragment(this.fragmentCount - 1)
  }
}
