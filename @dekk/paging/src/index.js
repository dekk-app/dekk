import {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * This component does not render any content but adds paging via key
 * commands.
 *
 * If a pageIndex has fragments this component will split the pageIndex into
 * different steps.
 * Without this components fragments won't work. They are rendered as
 * normal elements but never get activated.
 *
 * This is a private component which is used by Dekk internally.
 *
 * Due to the importance of this component it is not possible do
 * modify or access any parts. If you need acces to data you can always
 * use the store provided by Dekk.
 * @private
 */
class Paging extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      trigger: PropTypes.oneOf(['keyup', 'keydown']),
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
      trigger: 'keydown',
      slideCount: 1,
      slideIndex: 0,
      fragmentCount: 0,
      fragmentIndex: 0
    }
  }

  /**
   * @private
   */
  static get contextTypes() {
    return {
      store: PropTypes.object.isRequired
    }
  }

  /**
   * @private
   * @param {Object} props
   *   The properties
   * @param {String} props.trigger
   *   The event that triggers paging
   * @param {number} props.slideCount
   * @param {Object} context
   *   The context
   * @param {Object} context.store
   *   The mobx store passed through via context
   */
  constructor(props, context) {
    super(props, context)
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
   * Method to navigate to fragments or slideCount.
   * Uses left and right arrow buttons to navigate
   * @private
   * @param  {Object} e
   *   The event
   * @param {number} e.which
   *   The keyCode that has been triggered by the event
   */
  goTo({which}) {
    const {slideCount, slideIndex, fragmentIndex, fragmentCount} = this.props
    const {store} = this.context
    const {
      toPreviousPage,
      toNextPage,
      toNextFragment,
      toPreviousFragment
    } = store

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
        toNextPage()
      }
    }

    const handlePrev = () => {
      if (hasFragments && previousFragment < fragmentIndex) {
        toPreviousFragment()
      } else if (previousSlide !== slideIndex) {
        toPreviousPage()
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
