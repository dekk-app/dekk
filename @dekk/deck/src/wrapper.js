import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * Styled Wrapper Component. This component is used to wrap the slides.
 * It is private but allows modification by passing a mixin to `<Deck/>`
 * @private
 * @type {StyledComponent}
 * @property {{mixin: ?String, children: Array<Deck.slides,Deck.paging>}} props
 *   A mixin to allow extending Deck's style.
 *
 *   Required Styles are declared as `!important`
 *
 *   **The following properties are locked:**
 *
 *   * `position`
 *   * `top`
 *   * `right`
 *   * `bottom`
 *   * `left`
 *   * `overflow`
 *
 *   In rare cases when these need to be modified an `!important` declaration
 *   is required.
 *   A mixin can be any valid set of CSS rules.
 *
 *   Syntax features are as defined
 *   by styled-components {@link https://www.styled-components.com/docs}
 *
 *   @example
 *   // This private Component shoulld only be used by Decck itself
 *   // It is used as follows
 *   return (
 *     <Wrapper mixin={this.props.mixin}>
 *       {this.paging}
 *       {this.slides}
 *     </Wrapper>
 *   )
 */
const Wrapper = styled.div`
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  overflow: hidden !important;
  ${props => props.mixin || ''};
`

/**
 * Display name for `<Wrapper/>`
 * @private
 * @type {String}
 */
Wrapper.displayName = 'Wapper'

/**
 * Allowed propTypes for `<Wrapper/>`
 * @private
 * @param {Array<Deck.slides,Deck.paging>} children
 * @param {String} mixin
 * @type {Object}
 */
Wrapper.propTypes = {
  children: PropTypes.node,
  mixin: PropTypes.string
}

export default Wrapper
