import PropTypes from 'prop-types'

/**
 * It allows adding global/static elements to Dekk.
 * Elements render content and are usually pure functions or stateless
 * components.
 *
 * @public
 * @param {Object} props
 *   The properties
 * @param {(ReactElement|ReactElement[])} props.children
 *   One or more elements
 * @example
 * import Deck, {Elements} from '@dekk/deck'
 *
 * const Header = () => <header>Hello Dekk!</header>
 * export default (
 *   <Deck>
 *     <Elements>
 *       <Header/>
 *     </Elements>
 *   </Deck>
 * )
 */
const Elements = props => props.children

/**
 * @private
 */
Elements.propTypes = {
  mode: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

/**
 * This static method can be used in slides to stream dataa to elements.
 */
Elements.Data = () => null

export default Elements
