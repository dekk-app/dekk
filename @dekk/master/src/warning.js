import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders a warning containing useful information about the error that
 * caused the warning.
 * In general, it tells you what is wrong and what the correct usage
 * would look like. This is typically a text telling you that while
 * you used component "A" only component "B" or "C" are allowed.
 *
 * @private
 * @param {props} props
 *   The properties
 * @param {RectElement[]} props.not
 *   A list of components that are "not" allowed
 * @param {RectElement[]} props.only
 *   A list of "only" those components that are allowed
 * @param {Boolean} props.invalid
 *   Set this parameter if the warning is about invalid content
 * @param {Boolean} props.missing
 *   Set this parameter if the warning is about missing content
 * @param {String} props.type
 *   The type that was used and caused this warning
 */
const Warning = props => {
  const {not, only, invalid, missing, type} = props
  // Prepare a couple of messages that might be returned
  const onlyMessage = only ? (
    <div>
      <strong>Allowed components:</strong>
      <ul>
        {only.map((component, i) => (
          <li key={`warning_item__${i}`}>
            {component.displayName || component.name}
          </li>
        ))}
      </ul>
    </div>
  ) : null

  const notMessage = not ? (
    <div>
      <strong>Forbidden components:</strong>
      <ul>
        {not.map((component, i) => (
          <li key={`warning_item__${i}`}>
            {component.displayName || component.name}
          </li>
        ))}
      </ul>
    </div>
  ) : null

  const message = missing ? (
    <div>
      <strong>Error: Required slot</strong>
      {notMessage}
      {onlyMessage}
    </div>
  ) : invalid ? (
    <div>
      <strong>Error: Invalid component</strong>
      <p>Tried to use {type}</p>
      {notMessage}
      {onlyMessage}
    </div>
  ) : null
  return <div>{message}</div>
}

/**
 * Allowed propTypes for `<Warning/>`
 * @private
 * @property {?ReactElement[]} not
 * @property {?ReactElement[]} only
 * @property {String} type
 * @property {?Boolean} invalid
 * @property {?Boolean} missing
 */
Warning.propTypes = {
  not: PropTypes.array,
  only: PropTypes.array,
  type: PropTypes.string,
  invalid: PropTypes.bool,
  missing: PropTypes.bool
}

export default Warning
