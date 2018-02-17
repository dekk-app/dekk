import uuid from 'uuid/v4'
import {observable} from 'mobx'

/**
 * @private
 */
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

    this.goToPage = this.goToPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.goToFragment = this.goToFragment.bind(this)
    this.nextFragment = this.nextFragment.bind(this)
    this.previousFragment = this.previousFragment.bind(this)
  }

  /**
   * @private
   */
  goToPage(n) {
    this.direction = n > this.page ? 1 : -1
    this.page = n
  }

  /**
   * @private
   */
  nextPage() {
    this.goToPage(this.page + 1)
  }

  /**
   * @private
   */
  previousPage() {
    this.goToPage(this.page - 1)
  }

  /**
   * @private
   */
  goToFragment(n) {
    const m = this.fragmentHosts[this.page][n]
    this.fragment = m
    this.fragmentCount = n
  }

  /**
   * @private
   */
  nextFragment() {
    this.goToFragment(this.fragmentCount + 1)
  }

  /**
   * @private
   */
  previousFragment() {
    this.goToFragment(this.fragmentCount - 1)
  }
}
