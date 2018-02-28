import {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * @public
 * @param {Object} props
 *   The properties
 * @param {listenerOnSlide} props.onSlide
 *   Callback when the slide changes
 * @param {listenerOnFragment} props.onFragment
 *   Callback when the fragmnet changes
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
 * import Listener from '@dekk/listener'
 *
 * const handleSlide = (slideIndex, slideCount) => {
 *   // code
 * }
 *
 * const handleFragment = (
 *   slideIndex,
 *   slideCount,
 *   fragmentIndex,
 *   fragmentOrder,
 *   fragmentCount
 * ) => {
 *  // code
 * }
 * export default (
 *   <Deck>
 *     <Plugins>
 *       <Listener onSlide={handleSlide}
 *                 onFragment={handleFragment}/>
 *     </Plugins>
 *   </Deck>
 * )
 */
class Listener extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      slideIndex: PropTypes.number,
      slideCount: PropTypes.number,
      fragmentOrder: PropTypes.number,
      fragmentIndex: PropTypes.number,
      fragmentCount: PropTypes.number,
      onSlide: PropTypes.func,
      onFragment: PropTypes.func
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      slideIndex: 0,
      slideCount: 0,
      fragmentOrder: 0,
      fragmentIndex: 0,
      fragmentCount: 0,
      onSlide: () => null,
      onFragment: () => null
    }
  }

  /**
   * @private
   */
  componentWillReceiveProps({
    slideIndex,
    slideCount,
    fragmentOrder,
    fragmentIndex,
    fragmentCount
  }) {
    if (
      this.props.fragmentIndex !== fragmentIndex &&
      typeof fragmentOrder !== 'undefined'
    ) {
      this.props.onFragment(
        slideIndex,
        slideCount,
        fragmentIndex,
        fragmentOrder,
        fragmentCount
      )
    } else if (this.props.slideIndex !== slideIndex) {
      this.props.onSlide(slideIndex, slideCount)
    }
  }

  /**
   * @private
   */
  render() {
    return null
  }
}

/**
 * @typedef listenerOnSlide
 * @param {number} slideIndex
 *   Index of the currently active slide
 * @param {number} slideCount
 *   Total number of slides
 */

/**
 * @typedef listenerOnFragment
 * @param {number} slideIndex
 *   Index of the currently active slide
 * @param {number} slideCount
 *   Total number of slides
 * @param {number} fragmentIndex
 *   Index of the currently active fragment
 * @param {number} fragmentOrder
 *   Order of the currently active fragment
 * @param {number} fragmentCount
 *   Total number of fragments in the currently active slide
 */

export default Listener
