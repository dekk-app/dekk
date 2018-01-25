import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Motion, spring} from 'react-motion'

/**
 * A single slide.
 * Renders a slide inside a `react-motion` wrapper.
 * Assigns css-variables to allow various transitions
 *
 */
class Slide extends Component {
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
              <StyledSlide className={this.props.className}
                           current={this.props.current}
                           next={this.props.next}
                           previous={this.props.previous}
                           toPrevious={this.props.toPrevious}
                           toNext={this.props.toNext}
                           fromPrevious={this.props.fromPrevious}
                           fromNext={this.props.fromNext}
                           style={style}>
                {children}
              </StyledSlide>
            )
          }
        }
      </Motion>
    )
  }
}

const StyledSlide = styled.div`
  ${props => {
    if (props.fromPrevious) {
      return `
        --direction: -1;
      `
    }
    if (props.fromNext) {
      return `
        --direction: 1;
      `
    }
    if (props.toPrevious) {
      return `
        --direction: -1;
      `
    }
    if (props.toNext) {
      return `
        --direction: 1;
      `
    }
    if (props.previous) {
      return `
        --direction: -1;
      `
    }
    if (props.next) {
      return `
        --direction: 1;
      `
    }
    if (props.current) {
      return `
        --direction: 0;
      `
    }
  }}
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.current ? 1 : 0};
  transform: translate3d(calc(var(--time, 1) * 100% * var(--direction, -1)), 0, 0);
  overflow: hidden;
  color: var(--slide-color, inherit);
  background: var(--slide-background, none);
  background-size: cover;
`

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

export default Slide
