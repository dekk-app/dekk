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
    this.toNextPage = this.toNextPage.bind(this)
    this.toPreviousPage = this.toPreviousPage.bind(this)
    this.goToFragment = this.goToFragment.bind(this)
    this.toNextFragment = this.toNextFragment.bind(this)
    this.toPreviousFragment = this.toPreviousFragment.bind(this)
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
  toNextPage() {
    this.goToPage(this.page + 1)
    this.goToFragment(0)
  }

  /**
   * @private
   */
  toPreviousPage() {
    const {length} = this.fragmentHosts[this.page - 1]
    this.goToPage(this.page - 1)
    this.goToFragment(Math.max(0, length - 1))
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
  toNextFragment() {
    this.goToFragment(this.fragmentCount + 1)
  }

  /**
   * @private
   */
  toPreviousFragment() {
    this.goToFragment(this.fragmentCount - 1)
  }
}
