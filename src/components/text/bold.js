import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {bold, highlight} from './styles.scss'

const Bold = props => (
  <strong {...props} className={classNames(props.className, bold, {[highlight]: props.highlight})}>
    {props.children}
  </strong>
)

Bold.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Bold
