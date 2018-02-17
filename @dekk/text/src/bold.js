import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @public
 */
const Bold = styled.strong`
  font-weight: bold;
  ${props =>
    props.highlight ? 'color: var(--highlight-color, inherit);' : ''};
`

/**
 * @private
 */
Bold.propTypes = {
  className: PropTypes.string,
  highlight: PropTypes.bool,
  children: PropTypes.node
}

/**
 * @private
 */
Bold.displayName = 'Bold'

export default Bold
