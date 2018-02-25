import {Children, cloneElement} from 'react'
import PropTypes from 'prop-types'

/**
 * @public
 */
const Notes = ({children}) => {
  return typeof children === 'string'
    ? children
    : Children.toArray(children).map((child, i) =>
        cloneElement(child, {key: i})
      )
}

/**
 * @private
 */
Notes.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Notes
