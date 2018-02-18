import {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * @private
 */
export const writeHash = (page = 0, fragment = 0) => {
  window.location.hash = `#!/${page}/${fragment}/`
}

/**
 * @private
 */
class Url extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      type: PropTypes.oneOf(['hash', 'query', 'route']),
      page: PropTypes.number,
      fragmentCount: PropTypes.number
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
   * @param {Object} context
   *   The context
   * @param {Object} context.store
   *   The mobx store passed through via context
   */
  constructor(props, context) {
    super(props, context)
  }

  /**
   * @private
   * @todo implement route and query
   */
  componentDidMount() {
    const {hash = ''} = new URL(window.location.href)
    const [, page = 0, fragment = 0] = hash.split('/')
    this.context.store.goToPage(parseInt(page, 10))
    this.context.store.goToFragment(parseInt(fragment, 10))
  }

  /**
   * @private
   */
  componentWillReceiveProps({page, fragmentCount}) {
    writeHash(page, fragmentCount)
  }

  /**
   * @private
   */
  render() {
    return null
  }
}

export default Url
