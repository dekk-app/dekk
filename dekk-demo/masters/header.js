import React from 'react'
import classNames from 'classnames'
import styles from './header.scss'

const Header = props => (
  <header {...props} className={classNames(props.className, styles.header)}>
    <h3 className={styles.title}>Dekk 1.0.0-alpha</h3>
  </header>
)

export default Header
