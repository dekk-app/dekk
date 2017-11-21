import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {title} from './styles.scss'

const Title = props => (
  <h1 {...props} className={classNames(props.className, title)}>
    {props.children}
  </h1>
)

export default Title
