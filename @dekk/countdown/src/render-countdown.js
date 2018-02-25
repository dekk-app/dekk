/* eslint-disable react/prop-types */
import React from 'react'

const leadingZero = n => (n < 10 ? `0${n}` : n)

export default ({days, hours, minutes, seconds}, done, timerWarning) => {
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
