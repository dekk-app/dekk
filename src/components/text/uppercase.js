import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {uppercase} from './styles.scss'

const Uppercase = props => (
  <span {...props} className={classNames(props.className, uppercase)}>
    {props.children}
  </span>
)

export default Uppercase
