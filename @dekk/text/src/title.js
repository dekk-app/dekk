import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @public
 */
const Title = styled.h1`
  margin: 0;
  font-size: var(--title-font-size, 4em);
  text-align: center;
`

/**
 * @private
 */
Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * @private
 */
Title.displayName = 'Title'

export default Title
