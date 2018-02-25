import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from './img'

/**
 * The image mask
 * @private
 * @type {StyledComponent}
 * @param {Object} props
 *   The properties
 * @param {(Array|String)} props.mixin
 *  An additional mixin
 */
const Mask = styled.div`
  ${props => props.mixin || ''} background-size: cover;
  width: var(--width);
  height: var(--height);
`

/**
 * @private
 * @return {{mixin: ?(String|Array), children: (ReactElement|ReactElement[])}}
 *   Allowed propTypes for `<Mask/>`
 */
Mask.propTypes = {
  mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  children: PropTypes.instanceOf(Img)
}

export default Mask
