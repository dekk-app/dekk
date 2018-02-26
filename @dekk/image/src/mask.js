import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The image mask
 * @private
 * @type {StyledComponent}
 * @param {Object} props
 *   The properties
 * @param {(Array|String)} props.mixin
 *  An additional mixin
 * @param {(Array|String)} props.imageData
 *  background-image and default sizes as a mixin
 */
const Mask = styled.div`
  ${props => props.mixin || ''};
  ${props => props.imageData || ''};
  width: var(--width, var(--original-width, 0));
  height: var(--height, var(--original-height, 0));
  background-size: var(--background-size, cover);
  background-position: var(--background-position, center center);
`

/**
 * @private
 * @return {{imageData: ?(String|Array), mixin: ?(String|Array), children: (ReactElement|ReactElement[])}}
 *   Allowed propTypes for `<Mask/>`
 */
Mask.propTypes = {
  imageData: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  className: PropTypes.string,
  children: PropTypes.element
}

export default Mask
