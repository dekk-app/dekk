import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * Styled img
 * @private
 * @type {StyledComponent}
 * @param {Object} props
 *   The properties
 * @param {Function} props.innerRef
 * @param {String} props.alt
 * @param {String} props.src
 * @param {?String} [props.title]
 */
const Img = styled.img`
  display: none;
`

/**
 * @private
 * @return {{onLoad: Function, innerRef: Function, src: String, alt: String, title ?String)}}
 *   Allowed propTypes for `<Img/>`
 */
Img.propTypes = {
  onLoad: PropTypes.func,
  innerRef: PropTypes.func,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default Img
