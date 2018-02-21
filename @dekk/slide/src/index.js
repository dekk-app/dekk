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
  /**
   * @private
   */
  static get childContextTypes() {
    return {
      fragmentHost: PropTypes.number
    }
  }

  /**
   * @private
   */
  static get propTypes() {
    return {
      isCurrent: PropTypes.bool,
      isPrev: PropTypes.bool,
      isNext: PropTypes.bool,
      toPrev: PropTypes.bool,
      fromPrev: PropTypes.bool,
      toNext: PropTypes.bool,
      fromNext: PropTypes.bool,
      className: PropTypes.string,
      children: PropTypes.node,
      springSettings: PropTypes.object,
      background: PropTypes.string,
      slideIndex: PropTypes.number
    }
  }

  /**
   * @private
   */
  getChildContext() {
    return {
      fragmentHost: this.props.slideIndex
    }
  }

  /**
   * @private
   */
  render() {
    const {isPrev, isNext, children, springSettings} = this.props
    const springStyle = {
      time: spring(isPrev || isNext ? 1 : 0, {
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
              isCurrent={this.props.isCurrent}
              isNext={isNext}
              isPrev={isPrev}
              toPrev={this.props.toPrev}
              toNext={this.props.toNext}
              fromPrev={this.props.fromPrev}
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

/**
 * @private
 */
const SlideDirection = styled.div`
  ${props => {
    if (props.fromPrev) {
      return `
        --direction: -1;
      `
    }

    if (props.fromNext) {
      return `
        --direction: 1;
      `
    }

    if (props.toPrev) {
      return `
        --direction: -1;
      `
    }
    if (props.toNext) {
      return `
        --direction: 1;
      `
    }

    if (props.isPrev) {
      return `
        --direction: -1;
      `
    }

    if (props.isNext) {
      return `
        --direction: 1;
      `
    }

    if (props.isCurrent) {
      return `
        --direction: 0;
      `
    }
  }} z-index: ${props => (props.isCurrent ? 1 : 0)};
`

/**
 * @private
 */
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

export default Slide
