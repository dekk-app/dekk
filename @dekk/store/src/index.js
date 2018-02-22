import uuid from 'uuid/v4'
import {observable} from 'mobx'

/**
 * @private
 */
export default class Store {
  /**
   * Store Id
   * @type {String}
   */
  id = uuid()
  /**
   * Index of the currently active slide
   * @type {number}
   */
  @observable slideIndex = 0
  /**
   * Order of the currently active fragment
   * @type {number}
   */
  @observable fragmentOrder = 0
  /**
   * Index of the currently active fragment
   * @type {number}
   */
  @observable fragmentIndex = 0
  /**
   * Direction of the slide movement (either -1, 0 or 1)
   * @type {number}
   */
  @observable direction = 0

  /**
   * @private
   * @param {Object} props
   *   The properties
   * @param {number} props.slideIndex
   *   Initially active slideIndex
   */
  constructor(props) {
    // Allow starting at slide `n`
    this.slideIndex = props.slideIndex
    /**
     * A collection of hosts for fragments.
     * Each slide is a host.
     */
    this.fragmentHosts = []
    // Bind methods
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
