import React from 'react'
import PropTypes from 'prop-types'

const Warning = props => {
  const {not, only, invalid, missing, type} = props
  let message
  let onlyMessage
  let notMessage

  if (only) {
    onlyMessage = (
      <div>
        <strong>Allowed components:</strong>
        <ul>{only.map((component, i) => <li key={`warning_item__${i}`}>{component.name}</li>)}</ul>
      </div>
    )
  }

  if (not) {
    notMessage = (
      <div>
        <strong>Forbidden components:</strong>
        <ul>{not.map((component, i) => <li key={`warning_item__${i}`}>{component.name}</li>)}</ul>
      </div>
    )
  }

  if (missing) {
    message = (
      <div>
        <strong>Error: Required slot</strong>
        {notMessage}
        {onlyMessage}
      </div>
    )
  } else if (invalid) {
    message = (
      <div>
        <strong>Error: Invalid component</strong>
        <p>Tried to use {type}</p>
        {notMessage}
        {onlyMessage}
      </div>
    )
  }
  return (
    <div>
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
