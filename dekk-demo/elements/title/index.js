import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {title} from './styles.scss'
import {Title as DekkTitle} from '../../../src/components/text'

const Title = props => (
  <DekkTitle className={title}>
    {props.children}
  </DekkTitle>
)

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Title
