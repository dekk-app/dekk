import React, {Component} from 'react'
import PropTypes from 'prop-types'

const leadingZero = n => (n < 10 ? `0${n}` : n)

const dateHelpers = {
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000
}

export const renderCountdown = (
  days,
  hours,
  minutes,
  seconds,
  done,
  timerWarning
) => {
  const props = {}
  if (!days && !hours && minutes * 60 + seconds < timerWarning) {
    props['data-warning'] = ''
  }
  return (
    <div {...props}>
      {leadingZero(hours)}:{leadingZero(minutes)}:{leadingZero(seconds)}
    </div>
  )
}

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    const now = this.now.getTime()
    const then = now + this.props.end * dateHelpers.m
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      start: now,
      waiting: this.props.isRunning ? 0 : now,
      waited: 0
    }
    this.run = this.run.bind(this)
    this.stop = this.stop.bind(this)
  }
  get now() {
    return new Date()
  }
  get then() {
    return this.state.start + this.state.waited + this.props.end * dateHelpers.m
  }
  run(force = false) {
    const now = this.now
    const then = this.then
    const diff = then - now
    const done = diff <= 0
    const days = done ? 0 : Math.abs(~~(diff / dateHelpers.d))
    const hours = done ? 0 : Math.abs(~~(diff / dateHelpers.h) % 24)
    const minutes = done ? 0 : Math.abs(~~(diff / dateHelpers.m) % 60)
    const seconds = done ? 0 : Math.abs(~~(diff / dateHelpers.s) % 60)
    if ((!done && this.props.isRunning) || (!done && force === true)) {
      this.setState({
        done,
        days,
        hours,
        minutes,
        seconds
      })
      requestAnimationFrame(this.run)
    } else {
      this.stop()
    }
  }
  stop() {
    cancelAnimationFrame(this.run)
  }

  componentWillMount() {
    const now = this.now.getTime()
    const then = this.state.waited + this.props.end * dateHelpers.m
    this.setState({
      start: now,
      days: Math.abs(~~(then / dateHelpers.d)),
      hours: Math.abs(~~(then / dateHelpers.h) % 24),
      minutes: Math.abs(~~(then / dateHelpers.m) % 60),
      seconds: Math.abs(~~(then / dateHelpers.s) % 60)
    })
    if (this.props.isRunning) {
      this.run()
    } else {
      this.setState({
        waiting: now
      })
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isRunning && !this.props.isRunning) {
      this.setState({
        waited: this.state.waited + (this.now.getTime() - this.state.waiting)
      })
      this.run(true)
    } else if (!newProps.isRunning && this.props.isRunning) {
      this.setState({
        waiting: this.now.getTime()
      })
      this.stop()
    }
  }

  componentWillUnmount() {
    this.stop()
  }
  render() {
    const {days, hours, minutes, seconds, done} = this.state
    return this.props.render(
      days,
      hours,
      minutes,
      seconds,
      done,
      this.props.timerWarning
    )
  }
}
