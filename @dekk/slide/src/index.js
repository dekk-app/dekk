import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Motion, spring, presets} from 'react-motion'
import {slide} from '@dekk/animation'
import Notes from '@dekk/speaker-notes'

/**
 * A single slide.
 * Renders a slide inside a `react-motion` wrapper.
 * Assigns css-variables to allow various transitions
 * @param {Object} props
 * @param {Boolean} props.isCurrent
 * @param {Boolean} props.isPrev
 * @param {Boolean} props.isNext
 * @param {Boolean} props.toPrev
 * @param {Boolean} props.fromPrev
 * @param {Boolean} props.toNext
 * @param {Boolean} props.fromNext
 * @param {Boolean} props.isPreview
 * @param {Boolean} props.present
 * @param {number} props.fragmentOrder
 * @param {String} props.className
 * @param {(ReactElement|ReactElement[])} props.children
 * @param {Object} props.springSettings
 * @param {number} props.springSettings.stiffness
 * @param {number} props.springSettings.damping
 * @param {number} props.springSettings.precision
 * @param {(Array|String)} props.animation
 * @param {(Array|String)} props.animationIn
 * @param {(Array|String)} props.animationOut
 * @param {(Array|String)} props.mixin
 * @param {String} props.background
 * @param {number} props.slideIndex
 */
class Slide extends Component {
  /**
   * @private
   */
  static get childContextTypes() {
    return {
      isPreview: PropTypes.bool,
      fragmentOrder: PropTypes.number,
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
      isPreview: PropTypes.bool,
      present: PropTypes.bool,
      fragmentOrder: PropTypes.number,
      className: PropTypes.string,
      onRest: PropTypes.func,
      children: PropTypes.node.isRequired,
      springSettings: PropTypes.shape({
        stiffness: PropTypes.number,
        damping: PropTypes.number,
        precision: PropTypes.number
      }),
      animation: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      animationIn: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      animationOut: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      background: PropTypes.string,
      slideIndex: PropTypes.number
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      isCurrent: false,
      isPrev: false,
      isNext: false,
      toPrev: false,
      fromPrev: false,
      toNext: false,
      fromNext: false,
      isPreview: false,
      present: false,
      onRest: () => null,
      fragmentOrder: 0,
      className: '',
      springSettings: presets.stiff,
      animation: '',
      animationIn: '',
      animationOut: '',
      mixin: '',
      background: '',
      slideIndex: -1
    }
  }

  /**
   * Get contextTypes
   * @private
   *
   * @return {{store: store, fragmentHost: number, hostedFragmentOrder: number}}
   */
  static get contextTypes() {
    return {
      store: PropTypes.object.isRequired
    }
  }

  /**
   * @private
   */
  getChildContext() {
    return {
      isPreview: this.props.isPreview,
      fragmentHost: this.props.slideIndex,
      fragmentOrder: this.props.fragmentOrder || 0
    }
  }

  /**
   * Helper slots are filtered from the children.
   * These slots are allowed and will be ignored.
   * state setters, notes etc should be added here
   * @private
   */
  get helperSlots() {
    return [Notes]
  }

  /**
   * Filtered children of the component.
   * Excludes helperSlots
   * @private
   */
  get content() {
    return Children.toArray(this.props.children).filter(
      child => !this.helperSlots.includes(child.type)
    )
  }

  /**
   * Filtered notes of the slide.
   * @private
   */
  get notes() {
    return this.getNotes(this.props.children)
  }

  /**
   * Get notes from Items
   * @private
   */
  getNotes(items) {
    return Children.toArray(items).filter(child => child.type === Notes)
  }

  /**
   * @private
   * @param {(ReactElement|ReactElement[])} notes
   * @param {number} slideIndex
   */
  setNotes(notes, slideIndex) {
    this.context.store.notes.splice(slideIndex, 1, notes)
  }

  /**
   * @private
   */
  componentWillMount() {
    if (this.props.isCurrent) {
      this.setNotes(this.notes, this.props.slideIndex)
    }
  }

  /**
   * @private
   */
  componentWillReceiveProps(newProps) {
    if (newProps.isCurrent && newProps.slideIndex !== this.props.slideIndex) {
      this.setNotes(this.getNotes(newProps.children), newProps.slideIndex)
    }
  }

  /**
   * @private
   */
  render() {
    const {isPrev, isNext, isCurrent, onRest} = this.props
    const direction = (() => {
      if (this.props.fromPrev) {
        return -1
      }
      if (this.props.fromNext) {
        return 1
      }
      if (this.props.toPrev) {
        return -1
      }
      if (this.props.toNext) {
        return 1
      }
      if (isPrev) {
        return -1
      }
      if (isNext) {
        return 1
      }
      if (isCurrent) {
        return 0
      }
      return -1
    })()

    // Switch spring direction
    const springStyle = {
      time: spring(isPrev || isNext ? 1 : 0, {
        ...this.props.springSettings
      })
    }
    const handleRest = () => {
      if (typeof onRest === 'function' && isCurrent) {
        onRest(this.props.slideIndex)
      }
    }
    return (
      <Motion style={springStyle} onRest={handleRest}>
        {({time}) => {
          const style = {
            '--time': time
          }
          return (
            <StyledSlide
              className={this.props.className}
              style={style}
              direction={direction}
              present={this.props.present}
              background={this.props.background}
              mixin={this.props.mixin}
              animation={this.props.animation}
              animationIn={this.props.animationIn}
              animationOut={this.props.animationOut}>
              {this.content}
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
  --direction: ${({direction}) => direction};
  z-index: ${({isCurrent}) => (isCurrent ? 1 : 0)};
`

/**
 * @private
 */
const switchAnimation = props => {
  if (props.direction === 1 && props.animationIn) {
    return props.animationIn
  }
  if (props.direction === -1 && props.animationOut) {
    return props.animationOut
  }
  return props.animation || slide.normal
}

/**
 * @private
 */
const StyledSlide = styled(SlideDirection)`
  ${({mixin}) => mixin || ''};
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background: ${({background}) =>
    background || 'var(--slide-background, none)'};
  background-size: cover;
  color: var(--slide-color, currentColor);
  ${props =>
    props.present
      ? `
      transform: scale3d(var(--scale), var(--scale), 1);
      transform-origin: 0 0;
      width: calc(100% / var(--scale));
      height: calc(100% / var(--scale));
      right: auto;
      bottom: auto;
    `
      : `
      right: 0;
      bottom: 0;
      ${switchAnimation(props)};
    `};
`

export default Slide
