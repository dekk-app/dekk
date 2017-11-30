import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {Motion, spring} from 'react-motion'
import {setTitle} from '../../actions'
import styles from './styles.scss'

/**
 * A single slide.
 * Renders a slide inside a `react-motion` wrapper.
 * Assigns css-variables to allow various transitions
 *
 */
class Slide extends Component {

  get classNames() {
    return classNames(this.props.className, styles.slide, {
      [styles.current]: this.props.current,
      [styles.previous]: this.props.previous,
      [styles.next]: this.props.next,
      [styles.fromPrevious]: this.props.fromPrevious,
      [styles.toPrevious]: this.props.toPrevious,
      [styles.fromNext]: this.props.fromNext,
      [styles.toNext]: this.props.toNext
    })
  }

  render() {
    const {
      previous,
      next,
      children,
      springSettings,
      background
    } = this.props
    const springStyle = {
      time: spring(previous || next ? 1 : 0, springSettings)
    }
    return (
      <Motion style={springStyle}>
        {
          ({time}) => {
            const style = {
              '--time': ~~(time * 1000) / 1000,
              '--slide-background': background
            }
            return (
              <div className={this.classNames}
                   style={style}>
                {children}
              </div>
            )
          }
        }
      </Motion>
    )
  }
}

Slide.propTypes = {
  current: PropTypes.bool,
  previous: PropTypes.bool,
  next: PropTypes.bool,
  toPrevious: PropTypes.bool,
  fromPrevious: PropTypes.bool,
  toNext: PropTypes.bool,
  fromNext: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  springSettings: PropTypes.object,
  background: PropTypes.string
}

export {Slide}

export default connect(state => ({page: state.page}))(Slide)
