import {Component} from 'react'
import PropTypes from 'prop-types'

class Listener extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      onSlide: PropTypes.func,
      onFragment: PropTypes.func
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      onSlide: () => null,
      onFragment: () => null
    }
  }

  /**
   * @private
   * @param {Object} props
   *   The properties
   * @param {number} props.slideCount
   *   (Injected via Dekk)
   * @param {number} props.onSlide
   *   Callback when the slide changes
   * @param {number} props.onFragment
   *   Callback when the fragmnet changes
   * @param {number} props.slideIndex
   *   (Injected via Dekk)
   * @param {number} props.fragmentCount
   *   (Injected via Dekk)
   * @param {number} props.fragmentIndex
   *   (Injected via Dekk)
   * @param {number} props.fragmnetOrder
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
   */
  constructor(props) {
    super(props)
  }

  /**
   * @private
   */
  componentWillReceiveProps({slideIndex, fragmentOrder, fragmentIndex}) {
    if (
      this.props.fragmentIndex !== fragmentIndex &&
      typeof fragmentOrder !== 'undefined'
    ) {
      this.props.onFragment(slideIndex, fragmentIndex, fragmentOrder)
    } else if (this.props.slideIndex !== slideIndex) {
      this.props.onSlide(slideIndex)
    }
  }

  /**
   * @private
   */
  render() {
    return null
  }
}

export default Listener
