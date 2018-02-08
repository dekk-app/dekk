import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Center = styled.div`
  text-align: center;
`

Center.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

Center.displayName = 'Center'

export default Center
