import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Subtitle = styled.h2`
  margin: 0;
  font-size: var(--subtitle-font-size, 2em);
  text-align: center;
`

Subtitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Subtitle
