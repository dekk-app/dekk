import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @public
 */
const Uppercase = styled.span`
  text-transform: uppercase;
`

/**
 * @private
 */
Uppercase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * @private
 */
Uppercase.displayName = 'Uppercase'

export default Uppercase
