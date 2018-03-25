/* global window */
import {Component} from 'react'
import PropTypes from 'prop-types'
import {isNumeric} from '@dekk/utils'

/**
 * @public
 * @param {Object} props
 *   The properties
 * @param {String} props.channel
 * @param {Boolean} props.publish
 * @param {Boolean} props.subscribe
 * @param {number} props.slideIndex
 *   (Injected via Dekk)
 * @param {number} props.fragmentIndex
 *   (Injected via Dekk)
 * @param {Function} props.toFragment
 *   (Injected via Dekk)
 * @param {Function} props.toSlide
 *   (Injected via Dekk)
 * @example
 * import Deck, {Plugins} from '@dekk/deck'
 * import LocalStorage from '@dekk/local-storage'
 *
 * export default (
 *   <Deck>
 *     <Plugins>
 *       <LocalStorage subscribe/>
 *     </Plugins>
 *   </Deck>
 * )
 */
export default class LocalStorage extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      channel: PropTypes.string,
      subscribe: PropTypes.bool,
      publish: PropTypes.bool,
      slideIndex: PropTypes.number,
      fragmentIndex: PropTypes.number,
      toFragment: PropTypes.func,
      toSlide: PropTypes.func
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      channel: '@dekk',
      subscribe: false,
      publish: false,
      slideIndex: 0,
      fragmentIndex: 0,
      toFragment: () => null,
      toSlide: () => null
    }
  }

  /**
   * @public
   * @param {Object} props
   *   The properties
   * @param {String} props.channel
   * @param {Boolean} props.publish
   * @param {Boolean} props.subscribe
   * @param {number} props.slideIndex
   *   (Injected via Dekk)
   * @param {number} props.fragmentIndex
   *   (Injected via Dekk)
   * @param {Function} props.toFragment
   *   (Injected via Dekk)
   * @param {Function} props.toSlide
   *   (Injected via Dekk)
   */
  constructor(props) {
    super(props)
    this.handleStore = this.handleStore.bind(this)
  }

  /**
   * @private
   */
  componentDidMount() {
    if (this.props.subscribe) {
      const oldValue = window.localStorage.getItem(this.props.channel)
      try {
        this.handleMessage(JSON.parse(oldValue), true)
      } finally {
        window.addEventListener('storage', this.handleStore)
      }
    }
  }

  /**
   * Unsubscribe when unmounted
   * @private
   */
  componentWillUnmount() {
    if (this.props.subscribe) {
      window.removeEventListener('storage', this.handleStore)
    }
  }

  /**
   * When the props change we need to publish the changes.
   * To prevent flooding we only publish when the slideIndex or fragmentIndex
   * change.
   * @private
   */
  componentDidUpdate(oldProps) {
    const {slideIndex, fragmentIndex, publish} = this.props
    if (publish) {
      if (
        slideIndex !== oldProps.slideIndex ||
        fragmentIndex !== oldProps.fragmentIndex
      ) {
        const message = {
          slideIndex,
          fragmentIndex
        }
        window.localStorage.setItem(this.props.channel, JSON.stringify(message))
      }
    }
  }

  /**
   * Sends the message to localStorage after confirming a difference
   * between the old value and the new value
   * @private
   */
  handleStore({key, oldValue, newValue}) {
    if (key === this.props.channel && oldValue !== newValue) {
      this.handleMessage(JSON.parse(newValue))
    }
  }

  /**
   * @private
   * @param {String} message
   *   The message that has been sent
   */
  handleMessage(message, init) {
    // Only allow messages of type `object`
    if (typeof message === 'object') {
      const {slideIndex, fragmentIndex} = message
      if (isNumeric(slideIndex) && isNumeric(fragmentIndex)) {
        if (
          (slideIndex !== this.props.slideIndex &&
            fragmentIndex !== this.props.fragmentIndex) ||
          init
        ) {
          this.props.toSlide(slideIndex)
          this.props.toFragment(fragmentIndex)
        } else if (slideIndex !== this.props.slideIndex) {
          this.props.toSlide(slideIndex)
        } else if (fragmentIndex !== this.props.fragmentIndex) {
          this.props.toFragment(fragmentIndex)
        }
      }
    }
  }

  /**
   * @private
   */
  render() {
    return null
  }
}
