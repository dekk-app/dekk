import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Uppercase = styled.span`
  text-transform: uppercase;
`

Uppercase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Uppercase
