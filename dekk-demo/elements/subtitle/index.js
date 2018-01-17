import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {subtitle} from './styles.scss'
import {Subtitle as DekkSubtitle} from '../../../src/components/text'

const Subtitle = props => (
  <DekkSubtitle className={subtitle}>
    {props.children}
  </DekkSubtitle>
)

Subtitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Subtitle
