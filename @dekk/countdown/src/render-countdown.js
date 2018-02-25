/* eslint-disable react/prop-types */
import React from 'react'

/**
 * Pads a number with a leading zero if it is lower than 10
 * @private
 * @param {number} n
 * @return {String}

 */
const leadingZero = n => (n < 10 ? `0${n}` : n)

/**
 * Renders a coundown in a simple div.
 * A data-attribute `data-warning` is added when the timerWarning is
 * active.
 *
 * @public
 * @param {Object} data
 *   Time data
 * @param {number} data.days
 *   Remaining days
 * @param {number} data.hours
 *   Remaining hours
 * @param {number} data.minutes
 *   Remaining minutes
 * @param {number} data.seconds
 *   Remaining seconds
 * @param {Boolean} isDone
 *   Triggered when the timer is done
 * @param {Boolean} timerWarning
 *   Triggered when the warning limit has been reached
 * @return {ReactElement}
 */
const renderSimpleCountdown = (
  {days, hours, minutes, seconds},
  isDone,
  timerWarning
) => {
  const props = {}
  if (!days && !hours && minutes * 60 + seconds < timerWarning) {
    props['data-warning'] = ''
  }
  return (
    <span {...props}>
      {leadingZero(hours)}:{leadingZero(minutes)}:{leadingZero(seconds)}
    </span>
  )
}

export default renderSimpleCountdown
