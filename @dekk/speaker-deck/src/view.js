import React, {cloneElement} from 'react'
import PropTypes from 'prop-types'
import {css} from 'styled-components'
import {observer} from 'mobx-react'
import {range} from '@dekk/utils'
import Deck, {Wrapper} from '@dekk/deck'

import SpeakerWrapper from './speaker-wrapper'

import View from './views'

/**
 * A wrapper around the slides.
 *
 * @class SpeakerDeck
 * @param {Object} props
 *   The properties
 * @param {(Slide|Slide[]|Elements|Elements[]|Plugins|Plugins[])} props.children
 * @param {?(String|Array)} props.mixin
 */
@observer
export default class SpeakerDeck extends Deck {
  /**
   * @private
   */
  static get propTypes() {
    return {
      mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      children: PropTypes.node.isRequired
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      mixin: undefined
    }
  }

  /**
   * Setup slides fr the seaker.
   * Fills the slides with modified properties to show future states
   * @private
   */
  get speakerSlides() {
    const {slideIndex, fragmentOrder} = this.store

    // We need a maximum of 2 slides `[current, next]`
    const filteredSlides = this.slides.filter((c, i) =>
      range(i, slideIndex + 2, slideIndex)
    )

    const [currentSlide] = filteredSlides

    const currentView = cloneElement(currentSlide, {
      fragmentOrder,
      slideIndex,
      direction: 0,
      present: true,
      isCurrent: true,
      key: 'currentView'
    })

    return currentView
  }

  /**
   * @private
   * @return {Wrapper}
   *   The entire Deck inside a Wrapper
   */
  render() {
    const view = this.speakerSlides
    const mixin = css`
      ${this.props.mixin};
    `
    return (
      <Wrapper mixin={mixin}>
        {this.plugins}
        {this.elements}
        <SpeakerWrapper>
          <View>{view}</View>
        </SpeakerWrapper>
      </Wrapper>
    )
  }
}
