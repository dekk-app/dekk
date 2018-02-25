/* global window */
import {Component} from 'react'
import PropTypes from 'prop-types'
import dateHelpers from './date-helpers'

export {default as renderCountdown} from './render-countdown'

/**
 * A countdowntimer that can be paused.
 * @public
 * @param {Object} props
 *   The properties
 * @param {Boolean} props.isRunning
 *   Defines if the timer is running or paused
 * @param {number} props.timerWarning
 *   Defines when the timer warns you
 * @param {number} props.end
 *   Defines when the timerends
 * @param {renderCountdown} props.render
 *   A function that can be passed to render the timer
 */
export default class Countdown extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      isRunning: PropTypes.bool,
      timerWarning: PropTypes.number,
      end: PropTypes.number.isRequired,
      render: PropTypes.func.isRequired
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      isRunning: false,
      timerWarning: 0
    }
  }

  /**
   * A countdowntimer that can be paused.
   * @public
   * @param {Object} props
   *   The properties
   * @param {Boolean} props.isRunning
   *   Defines if the timer is running or paused
   * @param {number} props.timerWarning
   *   Defines when the timer warns you
   * @param {number} props.end
   *   Defines when the timerends
   * @param {renderCountdown} props.render
   *   A function that can be passed to render the timer
   */
  constructor(props) {
    super(props)

    /**
     * @private
     * @property {number} days
     * @property {number} hours
     * @property {number} minutes
     * @property {number} seconds
     * @property {number} start
     * @property {number} waiting
     * @property {number} waited
     */
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      start: this.now.getTime(),
      waiting: this.props.isRunning ? 0 : this.now.getTime(),
      waited: 0
    }

    this.run = this.run.bind(this)
    this.stop = this.stop.bind(this)
  }

  /**
   * @private
   */
  get now() {
    return new Date()
  }

  /**
   * @private
   */
  get then() {
    return this.state.start + this.state.waited + this.props.end * dateHelpers.m
  }

  /**
   * @private
   * @param {(Boolean|number)} force
   *   If a `Boolean` use it to force runs.
   */
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
      window.requestAnimationFrame(this.run)
    } else {
      this.stop()
    }
  }

  /**
   * @private
   */
  stop() {
    window.cancelAnimationFrame(this.run)
  }

  /**
   * @private
   */
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

  /**
   * @private
   * @param {Object} newProps
   */
  componentWillReceiveProps(newProps) {
    if (newProps.isRunning && !this.props.isRunning) {
      const {waiting} = this.state
      this.setState(prevState => ({
        waited: prevState.waited + (this.now.getTime() - waiting)
      }))
      this.run(true)
    } else if (!newProps.isRunning && this.props.isRunning) {
      this.setState({
        waiting: this.now.getTime()
      })
      this.stop()
    }
  }

  /**
   * @private
   */
  componentWillUnmount() {
    this.stop()
  }

  /**
   * @private
   */
  render() {
    const {days, hours, minutes, seconds, done} = this.state
    return this.props.render(
      {
        days,
        hours,
        minutes,
        seconds
      },
      done,
      this.props.timerWarning
    )
  }
}

/**
 * @typedef renderCountdown
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
