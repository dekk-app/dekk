import {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * This component does not render any content but adds paging via key
 * commands.
 *
 * If a slide has fragments this component will split the slide into
 * different steps.
 * @public
 */
class Paging extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      trigger: PropTypes.oneOf(['keyup', 'keydown']),
      toNextFragment: PropTypes.func,
      toPrevFragment: PropTypes.func,
      toFragment: PropTypes.func,
      toNextSlide: PropTypes.func,
      toPrevSlide: PropTypes.func,
      toSlide: PropTypes.func,
      slideCount: PropTypes.number,
      slideIndex: PropTypes.number,
      fragmentCount: PropTypes.number,
      fragmentIndex: PropTypes.number
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      trigger: 'keydown'
    }
  }

  /**
   * @public
   * @param {Object} props
   *   The properties
   * @param {String} [props.trigger='keyup']
   *   The event that triggers paging
   * @param {number} props.slideCount
   *   (Injected via Dekk)
   * @param {number} props.slideIndex
   *   (Injected via Dekk)
   * @param {number} props.fragmentCount
   *   (Injected via Dekk)
   * @param {number} props.fragmentIndex
   *   (Injected via Dekk)
   * @param {number} props.fragmentOrder
   *   (Injected via Dekk)
   * @param {function} props.toFragment
   *   (Injected via Dekk)
   * @param {function} props.toSlide
   *   (Injected via Dekk)
   * @param {function} props.toNextFragment
   *   (Injected via Dekk)
   * @param {function} props.toPrevFragment
   *   (Injected via Dekk)
   * @param {function} props.toNextSlide
   *   (Injected via Dekk)
   * @param {function} props.toPrevSlide
   *   (Injected via Dekk)
   * @example
   * import Deck, {Plugins} from '@dekk/deck'
   * import Paging from '@dekk/paging'
   *
   * export default (
   *   <Deck>
   *     <Plugins>
   *       <Paging/>
   *     </Plugins>
   *   </Deck>
   * )
   */
  constructor(props) {
    super(props)
    this.goTo = this.goTo.bind(this)
  }

  /**
   * Listen to events before we mount the component
   * @private
   */
  componentWillMount() {
    window.addEventListener(this.props.trigger, this.goTo)
  }

  /**
   * Unlisten to events before we unmount the component
   * @private
   */
  componentWillUnmount() {
    window.removeEventListener(this.props.trigger, this.goTo)
  }

  /**
   * Method to navigate to fragments or slides.
   * Uses left and right arrow buttons to navigate
   * @private
   * @param  {Object} e
   *   The event
   * @param {number} e.which
   *   The keyCode that has been triggered by the event
   */
  goTo({which}) {
    const {
      slideCount,
      slideIndex,
      fragmentIndex,
      fragmentCount,
      toNextSlide,
      toPrevSlide,
      toNextFragment,
      toPrevFragment
    } = this.props

    const hasFragments = Boolean(fragmentCount)

    const lastFragment = Math.max(0, fragmentCount - 1)

    const previousFragment = Math.max(0, fragmentIndex - 1)
    const nextFragment = Math.min(lastFragment, fragmentIndex + 1)

    const lastSlide = Math.max(0, slideCount - 1)
    const previousSlide = Math.max(0, slideIndex - 1)
    const nextSlide = Math.min(lastSlide, slideIndex + 1)

    const handleNext = () => {
      if (hasFragments && nextFragment > fragmentIndex) {
        toNextFragment()
      } else if (nextSlide !== slideIndex) {
        toNextSlide()
      }
    }

    const handlePrev = () => {
      if (hasFragments && previousFragment < fragmentIndex) {
        toPrevFragment()
      } else if (previousSlide !== slideIndex) {
        toPrevSlide()
      }
    }

    // Switch between left and right arrow buttons
    switch (which) {
      case 39:
        handleNext()
        break
      case 37:
        handlePrev()
        break
      default:
        break
    }
  }

  /**
   * @private
   */
  render() {
    return null
  }
}

export default Paging
