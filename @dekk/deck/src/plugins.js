import PropTypes from 'prop-types'

/**
 * It allows adding plugins to Dekk.
 * Plugins do not render anything.
 * Plugins usually use the Component lifecycle (componentWillMount etc.)
 * to their advantage.
 *
 * @public
 * @param {Object} props
 *   The properties
 * @param {(ReactElement|ReactElement[])} props.children
 *   One or more plugins
 * @example
 * import Deck, {Plugins} from '@dekk/deck'
 * import Url from '@dekk/url'
 * import Paging from '@dekk/paging'
 *
 * export default (
 *   <Deck>
 *     <Plugins>
 *       <Url/>
 *       <Paging/>
 *     </Plugins>
 *   </Deck>
 * )
 */
const Plugins = props => null

/**
 * @private
 */
Plugins.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default Plugins
