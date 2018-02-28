/* global window */
import {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * @public
 * @param {Object} props
 *   The properties
 * @param {Boolean} props.isPlaying
 *   Autoplay is only enabled if this is `true`
 * @param {number} props.delay
 *   time until the next slide/fragment (in seconds)
 * @param {number} props.slideCount
 *   (Injected via Dekk)
 * @param {number} props.slideIndex
 *   (Injected via Dekk)
 * @param {number} props.fragmentCount
 *   (Injected via Dekk)
 * @param {number} props.fragmentIndex
 *   (Injected via Dekk)
 * @param {Function} props.toNextFragment
 *   (Injected via Dekk)
 * @param {Function} props.toNextSlide
 *   (Injected via Dekk)
 * @example
 * import Deck, {Plugins} from '@dekk/deck'
 * import Autoplay from '@dekk/autoplay'
 *
 * export default (
 *   <Deck>
 *     <Plugins>
 *       <Autoplay isPlaying delay={120}/>
 *     </Plugins>
 *   </Deck>
 * )
 */
export default class Autoplay extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      delay: PropTypes.number,
      isPlaying: PropTypes.bool,
      slideIndex: PropTypes.number,
      slideCount: PropTypes.number,
      fragmentIndex: PropTypes.number,
      fragmentCount: PropTypes.number,
      toNextFragment: PropTypes.func,
      toNextSlide: PropTypes.func
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      delay: 30,
      isPlaying: false,
      slideIndex: 0,
      slideCount: 0,
      fragmentIndex: 0,
      fragmentCount: 0,
      toNextFragment: () => null,
      toNextSlide: () => null
    }
  }

  /**
   * @public
   * @param {Object} props
   *   The properties
   * @param {Boolean} props.isPlaying
   *   Autoplay is only enabled if this is `true`
   * @param {number} props.delay
   *   time until the next slide/fragment (in seconds)
   * @param {number} props.slideCount
   *   (Injected via Dekk)
   * @param {number} props.slideIndex
   *   (Injected via Dekk)
   * @param {number} props.fragmentCount
   *   (Injected via Dekk)
   * @param {number} props.fragmentIndex
   *   (Injected via Dekk)
   * @param {Function} props.toNextFragment
   *   (Injected via Dekk)
   * @param {Function} props.toNextSlide
   *   (Injected via Dekk)
   */
  constructor(props) {
    super(props)
    this.play = this.play.bind(this)
  }

  /**
   * @private
   */
  componentDidMount() {
    if (this.props.isPlaying) {
      this.play()
    }
  }

  /**
   * Waits for 1000 * `delay` ms and then navigates to the next
   * fragment or slide.
   *
   * @private
   */
  play() {
    const {
      fragmentCount,
      fragmentIndex,
      slideCount,
      slideIndex,
      toNextFragment,
      toNextSlide,
      isPlaying
    } = this.props
    if (isPlaying) {
      setTimeout(() => {
        if (fragmentCount > fragmentIndex + 1) {
          toNextFragment()
          window.requestAnimationFrame(this.play)
        } else if (slideCount > slideIndex + 1) {
          toNextSlide()
          window.requestAnimationFrame(this.play)
        } else {
          window.cancelAnimationFrame(this.play)
        }
      }, 1000 * this.props.delay)
    } else {
      window.cancelAnimationFrame(this.play)
    }
  }

  /**
   * @private
   */
  render() {
    return null
  }
}
