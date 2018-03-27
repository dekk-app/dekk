import React, {cloneElement, Children} from 'react'
import PropTypes from 'prop-types'
import {css} from 'styled-components'
import {observer} from 'mobx-react'
import {range} from '@dekk/utils'
import Slide from '@dekk/slide'
import {Title} from '@dekk/text'
import Deck, {Wrapper, Elements} from '@dekk/deck'

import SpeakerWrapper from './speaker-wrapper'

import {Preview} from './views'

/**
 * Styles for empty slides.
 * This is used for preview & next-view if no more slides exist.
 * @private
 */
const emptyStyle = css`
  background: #000;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
`

/**
 * End of presentation slide.
 * This is used for preview & next-view if no more slides exist.
 * @private
 */
const endOfPresentation = (
  <Slide mixin={emptyStyle}>
    <Title>End of presentation</Title>
  </Slide>
)

/**
 * A wrapper around the slides.
 *
 * @class SpeakerDeck
 * @param {Object} props
 *   The properties
 * @param {(Slide|Slide[]|Elements|Elements[]|Plugins|Plugins[])} props.children
 * @param {?(String|Array)} props.mixin
 * )
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
    const {slideIndex, fragmentIndex} = this.store

    // Get the current fragmentHost
    // and create a boolean flag to check for fragments
    const fragmentHost = this.store.fragmentHosts[slideIndex]
    const hasFragments = fragmentHost.length - fragmentIndex > 1

    // We need a maximum of 2 slides `[current, next]`
    const filteredSlides = this.slides.filter((c, i) =>
      range(i, slideIndex + 2, slideIndex)
    )

    const [currentSlide, nextSlide = endOfPresentation] = filteredSlides

    // The "pre-view" is either the current slide or the next slide
    // depending on the fragemnt flag
    const preView = hasFragments ? currentSlide : nextSlide

    const nextView = cloneElement(preView, {
      direction: 0,
      present: true,
      isNext: true,
      slideIndex: hasFragments ? slideIndex : slideIndex + 1,
      fragmentOrder: hasFragments ? fragmentHost[fragmentIndex + 1] : 0,
      key: 'nextView'
    })

    // Only return next
    return nextView
  }

  get previewData() {
    const {slideIndex, fragmentIndex} = this.store

    // Get the current fragmentHost
    // and create a boolean flag to check for fragments
    const fragmentHost = this.store.fragmentHosts[slideIndex]
    const hasFragments = fragmentHost.length - fragmentIndex > 1

    // Only return next
    return {
      slideIndex: hasFragments ? slideIndex : slideIndex + 1,
      fragmentIndex: hasFragments ? fragmentIndex + 1 : 0,
      fragmentOrder: hasFragments ? fragmentHost[fragmentIndex + 1] : 0
    }
  }

  /**
   * @private
   */
  get elements() {
    const {length: slideCount} = this.slides
    if (this.previewData.slideIndex >= slideCount) {
      return Children.toArray(this.props.children)
        .filter(child => typeof child === 'object' && child.type === Elements)
        .reduce((a, b) => a.concat(b.props.children), [])
        .filter(Boolean)
        .map((element, index) =>
          cloneElement(element, {
            key: `${element.type.name}_${index}`
          })
        )
    }
    const {length: fragmentCount} = this.store.fragmentHosts[
      this.previewData.slideIndex
    ]
    return Children.toArray(this.props.children)
      .filter(child => typeof child === 'object' && child.type === Elements)
      .reduce((a, b) => a.concat(b.props.children), [])
      .filter(Boolean)
      .map((element, index) =>
        cloneElement(element, {
          ...this.getElementsData(this.previewData.slideIndex),
          key: `${element.type.name}_${index}`,
          ...this.store.publicMethods,
          slideCount,
          fragmentCount,
          ...this.previewData
        })
      )
  }

  /**
   * @private
   * @return {Wrapper}
   *   The entire Deck inside a Wrapper
   */
  render() {
    const preview = this.speakerSlides
    const mixin = css`
      ${this.props.mixin};
    `
    return (
      <Wrapper mixin={mixin}>
        {this.plugins}
        {this.elements}
        <SpeakerWrapper>
          <Preview>{preview}</Preview>
        </SpeakerWrapper>
      </Wrapper>
    )
  }
}
