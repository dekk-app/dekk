import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'
import {Subtitle} from '../../../src/components/text'

const StyledSubtitle = styled(Subtitle)`
  --title-font-size:  1rem;
  font-weight: lighter;
  text-transform: uppercase;
  margin-top: 2rem;
`

StyledSubtitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default StyledSubtitle
