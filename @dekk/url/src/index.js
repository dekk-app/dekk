/* global window history URL */

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
    .split(/[?&]/)
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

export const search = {
  parse(url) {
    const {search = ''} = new URL(url)
    const parts = search.split(/[?&]/).filter(Boolean)
    return parts.reduce((a, b) => {
      const [key, value] = b.split('=')
      return {
        ...a,
        [key]: value === 'false' ? false : isNaN(value) ? value : Number(value)
      }
    }, {})
  },
  write(data) {
    const oldQuery = search.parse(window.location.href)
    const newQuery = {...oldQuery, ...data}
    const queryString = Object.entries(newQuery)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    history.pushState(newQuery, 'searchQuery', `?${queryString}`)
  }
}

/**
 * @public
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
   * @public
   * @param {Object} props
   *   The properties
   * @param {String} [props.type='hash']
   *   Either `hash` or `query` to enable hash(bang) or search query URLs
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
   * import Url from '@dekk/url'
   *
   * export default (
   *   <Deck>
   *     <Plugins>
   *       <Url/>
   *     </Plugins>
   *   </Deck>
   * )
   */
  constructor(props) {
    super(props)
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
    this.toSlide(slideIndex)
    this.toFragment(fragmentIndex)
  }

  /**
   * @private
   */
  query(url) {
    const {search = ''} = new URL(url)
    const parts = search.split(/[?&]/).filter(Boolean)
    const {page: slideIndex = 0, fragment: fragmentIndex = 0} = parts.reduce(
      (a, b) => {
        const [key, value] = b.split('=')
        return {...a, [key]: value}
      },
      {}
    )
    this.toSlide(slideIndex)
    this.toFragment(fragmentIndex)
  }

  /**
   * @private
   */
  toFragment(fragmentIndex) {
    this.props.toFragment(parseInt(fragmentIndex, 10))
  }

  /**
   * @private
   */
  toSlide(slideIndex) {
    this.props.toSlide(parseInt(slideIndex, 10))
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
