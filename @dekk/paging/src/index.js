import {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * This component does not render any content but adds paging via key
 * commands.
 *
 * If a page has fragments this component will split the page into
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
      trigger: PropTypes.oneOf(['keyup', 'keydown']).isRequired,
      pages: PropTypes.number.isRequired
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
   * @param {number} props.pages
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
   * Method to navigate to fragments or pages.
   * Uses left and right arrow buttons to navigate
   * @private
   * @param  {Object} e
   *   The event
   * @param {number} e.which
   *   The keyCode that has been triggered by the event
   */
  goTo({which}) {
    const {pages} = this.props
    const {store} = this.context
    const {
      page,
      goToPage,
      fragmentCount,
      fragmentHosts,
      goToFragment,
      setFragment
    } = store
    const {length = 0} = fragmentHosts[page]
    const previousFragment = Math.max(0, fragmentCount - 1)
    const nextFragment = Math.min(length - 1, fragmentCount + 1)
    const previousPage = Math.max(0, page - 1)
    const nextPage = Math.min(pages - 1, page + 1)

    // Switch between left and right arrow buttons
    switch (which) {
      case 39:
        ;(() => {
          if (length && nextFragment > fragmentCount) {
            goToFragment(nextFragment)
          } else if (nextPage !== page) {
            goToPage(nextPage)
            goToFragment(0)
          }
        })()
        break
      case 37:
        ;(() => {
          if (length && previousFragment < fragmentCount) {
            goToFragment(previousFragment)
          } else if (previousPage !== page) {
            goToPage(previousPage)
            goToFragment(fragmentHosts[previousPage].length - 1)
          }
        })()
        break
      default:
        break
    }

    this.props.url(store.page, store.fragment)
  }

  /**
   * @private
   */
  render() {
    return null
  }
}

export default Paging
