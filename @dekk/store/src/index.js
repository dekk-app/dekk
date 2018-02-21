import uuid from 'uuid/v4'
import {observable} from 'mobx'

/**
 * @private
 */
export default class Store {
  id = uuid()
  @observable slideIndex = 0
  @observable fragmentOrder = 0
  @observable fragmentIndex = 0
  @observable direction = 0
  constructor(props) {
    this.page = props.page
    this.fragmentHosts = props.fragmentHosts

    this.toSlide = this.toSlide.bind(this)
    this.toNextSlide = this.toNextSlide.bind(this)
    this.toPrevSlide = this.toPrevSlide.bind(this)
    this.toFragment = this.toFragment.bind(this)
    this.toNextFragment = this.toNextFragment.bind(this)
    this.toPrevFragment = this.toPrevFragment.bind(this)
  }

  /**
   * Public methods.
   *
   * These methods can be used to modify the store.
   */
  get publicMethods() {
    return {
      toSlide: this.toSlide,
      toNextSlide: this.toNextSlide,
      toPrevSlide: this.toPrevSlide,
      toFragment: this.toFragment,
      toNextFragment: this.toNextFragment,
      toPrevFragment: this.toPrevFragment
    }
  }

  /**
   * @private
   */
  toSlide(slideIndex) {
    this.direction = slideIndex > this.slideIndex ? 1 : -1
    this.slideIndex = slideIndex
  }

  /**
   * @private
   */
  toNextSlide() {
    this.toSlide(this.slideIndex + 1)
    this.toFragment(0)
  }

  /**
   * @private
   */
  toPrevSlide() {
    const {length: prevFragmentCount = 0} = this.fragmentHosts[
      this.slideIndex - 1
    ]
    const prevLastFragment = Math.max(0, prevFragmentCount - 1)
    this.toSlide(this.slideIndex - 1)
    this.toFragment(prevLastFragment)
  }

  /**
   * @private
   */
  toFragment(fragmentIndex) {
    const fragmentOrder = this.fragmentHosts[this.slideIndex][fragmentIndex]
    this.fragmentOrder = fragmentOrder
    this.fragmentIndex = fragmentIndex
  }

  /**
   * @private
   */
  toNextFragment() {
    this.toFragment(this.fragmentIndex + 1)
  }

  /**
   * @private
   */
  toPrevFragment() {
    this.toFragment(this.fragmentIndex - 1)
  }
}
