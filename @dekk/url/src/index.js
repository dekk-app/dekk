import {Component} from 'react'
import PropTypes from 'prop-types'

/**
 * @private
 */
export const writeHash = (slideIndex = 0, fragmentIndex = 0) => {
  window.location.hash = `#!/${slideIndex}/${fragmentIndex}/`
}

/**
 * @private
 */
export const writeQuery = (slideIndex = 0, fragmentIndex = 0, old = '') => {
  const oldQuery = window.location.search
    .split(/[\?&]/)
    .filter(x => x !== '' && !x.match(/(page|fragment)/))
    .join('&')
  history.pushState(
    {page: slideIndex, fragment: fragmentIndex},
    `page ${slideIndex}, fragment ${fragmentIndex}`,
    `?page=${slideIndex}&fragment=${fragmentIndex}${
      oldQuery ? `&${oldQuery}` : ''
    }`
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
      slideIndex: PropTypes.number,
      fragmentIndex: PropTypes.number
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      type: 'hash',
      slideIndex: 0,
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
    const [, slideIndex = 0, fragmentIndex = 0] = hash.split('/')
    this.context.store.goToPage(parseInt(slideIndex, 10))
    this.context.store.goToFragment(parseInt(fragmentIndex, 10))
  }

  /**
   * @private
   */
  query(url) {
    const {search = ''} = new URL(url)
    const parts = search.split(/[\?&]/).filter(Boolean)
    const {page: slideIndex = 0, fragment: fragmentIndex = 0} = parts.reduce(
      (a, b) => {
        const [key, value] = b.split('=')
        return {...a, [key]: value}
      },
      {}
    )
    this.context.store.goToPage(parseInt(slideIndex, 10))
    this.context.store.goToFragment(parseInt(fragmentIndex, 10))
  }

  /**
   * @private
   */
  componentWillReceiveProps({slideIndex, fragmentIndex}) {
    switch (this.props.type) {
      case 'hash':
        writeHash(slideIndex, fragmentIndex)
        break
      case 'query':
        writeQuery(slideIndex, fragmentIndex)
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
