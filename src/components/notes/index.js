import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {notes} from './styles.scss'

const Notes = props => (
  <aside className={classNames(props.className, notes)}>
    {props.children}
  </aside>
)

Notes.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string
}

export default Notes
