import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @public
 */
const Text = styled.p`
  padding: 0;
`
/**
 * @private
 */
Text.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * @private
 */
Text.displayName = 'Text'

export default Text
