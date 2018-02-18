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
export const writeQuery = (page = 0, fragment = 0, old = '') => {
  const oldQuery = window.location.search
    .split(/[\?&]/)
    .filter(x => x !== '' && !x.match(/(page|fragment)/))
    .join('&')
  history.pushState(
    {page, fragment},
    `page ${page}, fragment ${fragment}`,
    `?page=${page}&fragment=${fragment}${oldQuery ? `&${oldQuery}` : ''}`
  )
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
      type: PropTypes.oneOf(['hash', 'query']),
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
   */
  componentDidMount() {
    this[this.props.type](window.location.href)
  }

  /**
   * @private
   */
  hash(url) {
    const {hash = ''} = new URL(url)
    const [, page = 0, fragment = 0] = hash.split('/')
    this.context.store.goToPage(parseInt(page, 10))
    this.context.store.goToFragment(parseInt(fragment, 10))
  }

  /**
   * @private
   */
  query(url) {
    const {search = ''} = new URL(url)
    const parts = search.split(/[\?&]/).filter(Boolean)
    const {page = 0, fragment = 0} = parts.reduce((a, b) => {
      const [key, value] = b.split('=')
      return {...a, [key]: value}
    }, {})
    this.context.store.goToPage(parseInt(page, 10))
    this.context.store.goToFragment(parseInt(fragment, 10))
  }

  /**
   * @private
   */
  componentWillReceiveProps({page, fragmentCount}) {
    switch (this.props.type) {
      case 'hash':
        writeHash(page, fragmentCount)
        break
      case 'query':
        writeQuery(page, fragmentCount)
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

export default Url
