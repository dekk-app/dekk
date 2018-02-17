import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @public
 */
const Center = styled.div`
  text-align: center;
`

/**
 * @private
 */
Center.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * @private
 */
Center.displayName = 'Center'

export default Center
