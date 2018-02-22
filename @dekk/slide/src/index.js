import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Motion, spring} from 'react-motion'
import {slide} from '@dekk/animation'

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
      springSettings: PropTypes.shape({
        stiffness: PropTypes.number,
        damping: PropTypes.number,
        precision: PropTypes.number
      }),
      animation: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
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
    const {isPrev, isNext} = this.props
    const springStyle = {
      time: spring(isPrev || isNext ? 1 : 0, {
        ...this.props.springSettings
      })
    }
    return (
      <Motion style={springStyle}>
        {({time}) => {
          const style = {
            '--time': time
          }
          return (
            <StyledSlide
              className={this.props.className}
              style={style}
              background={this.props.background}
              mixin={this.props.mixin}
              animation={this.props.animation}
              isCurrent={this.props.isCurrent}
              isNext={isNext}
              isPrev={isPrev}
              toPrev={this.props.toPrev}
              toNext={this.props.toNext}
              fromPrev={this.props.fromPrev}
              fromNext={this.props.fromNext}>
              {this.props.children}
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
  --direction: ${props => {
    if (props.fromPrev) {
      return -1
    }
    if (props.fromNext) {
      return 1
    }
    if (props.toPrev) {
      return -1
    }
    if (props.toNext) {
      return 1
    }
    if (props.isPrev) {
      return -1
    }
    if (props.isNext) {
      return 1
    }
    if (props.isCurrent) {
      return 0
    }
    return -1
  }};
  z-index: ${({isCurrent}) => (isCurrent ? 1 : 0)};
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
  overflow: hidden;
  color: var(--slide-color, currentColor);
  background: ${({background}) =>
    background || 'var(--slide-background, none)'};
  background-size: cover;
  ${({mixin}) => mixin || ''};
  ${({animation}) => animation || slide.normal};
`

export default Slide
