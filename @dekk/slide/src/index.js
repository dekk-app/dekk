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
    const {previous, next, children, springSettings} = this.props
    const springStyle = {
      time: spring(previous || next ? 1 : 0, {
        stiffness: 100,
        damping: 20,
        ...springSettings
      })
    }
    return (
      <Motion style={springStyle}>
        {({time}) => {
          const style = {
            '--time': ~~(time * 1000) / 1000
          }
          return (
            <StyledSlide
              background={this.props.background}
              mixin={this.props.animation}
              className={this.props.className}
              current={this.props.current}
              next={next}
              previous={previous}
              toPrevious={this.props.toPrevious}
              toNext={this.props.toNext}
              fromPrevious={this.props.fromPrevious}
              fromNext={this.props.fromNext}
              style={style}>
              {children}
            </StyledSlide>
          )
        }}
      </Motion>
    )
  }
}

const SlideDirection = styled.div`
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
  }} z-index: ${props => (props.current ? 1 : 0)};
`

const StyledSlide = styled(SlideDirection)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translate3d(
    calc(100% * var(--direction, -1) * var(--time, 1)),
    0,
    0
  );
  overflow: hidden;
  color: var(--slide-color, inherit);
  background: ${props => props.background || 'none'};
  background-size: cover;
  ${props => props.mixin || ''};
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
