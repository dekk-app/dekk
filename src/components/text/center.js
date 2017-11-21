import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {center} from './styles.scss'

const Center = props => (
  <div {...props} className={classNames(props.className, center)}>
    {props.children}
  </div>
)

export default Center
