import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import styles from './header.scss'

export const Header = props => (
  <header className={classNames(props.className, styles.header)}>
    <h3 className={styles.title}>{props.title}</h3>
  </header>
)

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired
}

export default connect(state => ({title: state.title}))(Header)
