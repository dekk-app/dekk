import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

const Warning = props => {
  const {not, only, invalid, missing, type} = props
  let message
  let onlyMessage
  let notMessage

  if (only) {
    onlyMessage = (
      <div className={styles.info}>
        <strong>Allowed components:</strong>
        <ul>{only.map((component, i) => <li key={`warning_item__${i}`}>{component.name}</li>)}</ul>
      </div>
    )
  }

  if (not) {
    notMessage = (
      <div className={styles.info}>
        <strong>Forbidden components:</strong>
        <ul>{not.map((component, i) => <li key={`warning_item__${i}`}>{component.name}</li>)}</ul>
      </div>
    )
  }

  if (missing) {
    message = (
      <div className={styles.message}>
        <strong>Error: Required slot</strong>
        {notMessage}
        {onlyMessage}
      </div>
    )
  } else if (invalid) {
    message = (
      <div className={styles.message}>
        <strong>Error: Invalid component</strong>
        <p>Tried to use {type}</p>
        {notMessage}
        {onlyMessage}
      </div>
    )
  }
  return (
    <div className={styles.warning}>
      {message}
    </div>
  )
}

Warning.propTypes = {
  not: PropTypes.array,
  only: PropTypes.array,
  type: PropTypes.string,
  invalid: PropTypes.bool,
  missing: PropTypes.bool
}

export default Warning
