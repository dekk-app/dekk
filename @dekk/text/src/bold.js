import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Bold = styled.strong`
  font-weight: bold;
  ${props => (props.highlight ? 'color: var(--highlight-color);' : '')};
`

Bold.propTypes = {
  className: PropTypes.string,
  highlight: PropTypes.bool,
  children: PropTypes.node
}

Bold.displayName = 'Bold'

export default Bold
