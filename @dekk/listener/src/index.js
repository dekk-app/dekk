import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Listener extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      onPage: PropTypes.func,
      onFragment: PropTypes.func
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      onPage: () => null,
      onFragment: () => null
    }
  }

  /**
   * @private
   * @param {Object} props
   *   The properties
   */
  constructor(props) {
    super(props)
  }

  /**
   * @private
   */
  componentWillReceiveProps({page, fragment, fragmentCount}) {
    if (
      this.props.fragmentCount !== fragmentCount &&
      typeof fragment !== 'undefined'
    ) {
      this.props.onFragment(page, fragmentCount, fragment)
    } else if (this.props.page !== page) {
      this.props.onPage(page)
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
