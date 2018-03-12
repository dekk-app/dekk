import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export {default as icons} from './icons'

/**
 * Styled icon wrapper
 * Adds basic color and sizing logic
 * @private
 */
export const StyledIcon = styled.span`
  display: inline-flex;
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

/**
 * Icon
 * Creates an SVG icon
 * @public
 * @param {Object} props
 *   The properties
 * @param {ReactElement} props.icon
 *   An SVG icon
 * @param {(ReactElement|ReactElement[])} props.children
 *   If children are provided the `icon` is ignored
 * @param {String} props.size
 *   size of the icon plus unit (e.g. 1rem)
 */
const Icon = ({children, icon, size = '1em'}) => (
  <StyledIcon size={size}>{children || icon}</StyledIcon>
)

/**
 * @private
 */
Icon.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  size: PropTypes.string
}

/**
 * @private
 */
Icon.defaultProps = {
  children: null,
  icon: null,
  size: '1em'
}

export default Icon
