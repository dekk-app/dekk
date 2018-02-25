import React, {Component} from 'react'
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

export default Icon
