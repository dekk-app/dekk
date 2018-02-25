import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const StyledIcon = styled.span`
  font-size: ${({size}) => size || '1em'};

  svg,
  circle,
  rect,
  path,
  g {
    fill: currentColor;
  }
  svg {
    height: 1em;
    width: 1em;
  }
`

const Icon = ({children, icon, size = '1em'}) => (
  <StyledIcon size={size}>{children || icon}</StyledIcon>
)

Icon.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  size: PropTypes.string
}

Icon.defaultProps = {
  children: null,
  icon: null,
  size: '1em'
}

export default Icon
