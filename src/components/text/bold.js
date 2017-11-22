import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {bold} from './styles.scss'

const Bold = props => (
  <strong {...props} className={classNames(props.className, bold)}>
    {props.children}
  </strong>
)

Bold.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Bold
