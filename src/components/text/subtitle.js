import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {subtitle} from './styles.scss'

const Subtitle = props => (
  <h2 {...props} className={classNames(props.className, subtitle)}>
    {props.children}
  </h2>
)

export default Subtitle
