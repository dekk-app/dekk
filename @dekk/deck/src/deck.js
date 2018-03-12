import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {range} from '@dekk/utils'
import Store from '@dekk/store'
import Wrapper from './wrapper'
import SlidesWrapper from './slides-wrapper'
import Plugins from './plugins'
import Elements from './elements'

/**
 * A wrapper around the slides.
 * `<Deck/>` renders 3 slides (previous, current, next) to allow various
 * transitions.
 *
 * The internal store is handled by mobX. {@link https://github.com/mobxjs/}
 *
 * @class Deck
 * @param {Object} props
 *   The properties
 * @param {(Slide|Slide[]|Elements|Elements[]|Plugins|Plugins[])} props.children
 * @param {(String|Array)} props.mixin
 *
 * @example
 * import React from 'react'
 * import Deck from '@dekk/deck'
 * import Slide from '@dekk/slide'
 *
 * const App = () => (
 *   <Dekk>
 *     <Slide>1</Slide>
 *     <Slide>2</Slide>
 *     <Slide>3</Slide>
 *   </Dekk>
 * )
 */
@observer
export default class Deck extends Component {
  /**
   * Store.
   * It handles paging and fragmentOrder navigation
   * @private
   */
  store = new Store()

  /**
   * @private
   * @return {{children: (Slide|Slide[]), mixin: ?String, slave: ?Boolean}}
   *   Allowed propTypes for `<Deck/>`
   */
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired,
      mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      mixin: ''
    }
  }

  /**
   * Sends context to decendants.
   * Includes the app store to allow all deck components to access the store
   * without having to include its own logic.
   * @private
   * @return {{store: Object, fragmentHost: number}}
   *   The `store` and the `fragmentHost`
   */
  static get childContextTypes() {
    return {
      store: PropTypes.object.isRequired,
      fragmentHost: PropTypes.number
    }
  }

  /**
   * @private
   * @return {{store: store}}
   *   The child context.
   */
  getChildContext() {
    return {
      store: this.store
    }
  }

  /**
   * @private
   */
  componentWillMount() {
    this.buildFragmentHosts(this.props.children)
  }

  /**
   * @private
   */
  componentWillReceiveProps(newProps) {
    // Rebuild fragmentHost when children change
    // this will prevent undefined hosts while reducing the number
    // of calls
    if (newProps.children !== this.props.children) {
      this.buildFragmentHosts(newProps.children)
    }
  }

  /**
   * @private
   */
  buildFragmentHosts(children) {
    Children.toArray(children)
      .filter(child => !this.slots.includes(child.type))
      .forEach((child, index) => {
        if (this.store.fragmentHosts.length - 1 < index)
          this.store.fragmentHosts[index] = []
      })
  }

  /**
   * @private
   */
  get plugins() {
    const {slideIndex, fragmentIndex, fragmentOrder} = this.store
    const {length: slideCount} = this.slides
    const {length: fragmentCount} = this.store.fragmentHosts[slideIndex]
    return Children.toArray(this.props.children)
      .filter(child => typeof child === 'object' && child.type === Plugins)
      .reduce((a, b) => a.concat(b.props.children), [])
      .filter(Boolean)
      .map((plugin, index) =>
        cloneElement(plugin, {
          key: `${plugin.type.name}_${index}`,
          ...this.store.publicMethods,
          slideIndex,
          slideCount,
          fragmentIndex,
          fragmentCount,
          fragmentOrder
        })
      )
  }

  /**
   * @private
   */
  get elements() {
    const {slideIndex, fragmentIndex, fragmentOrder} = this.store
    const {length: slideCount} = this.slides
    const {length: fragmentCount} = this.store.fragmentHosts[slideIndex]
    return Children.toArray(this.props.children)
      .filter(child => typeof child === 'object' && child.type === Elements)
      .reduce((a, b) => a.concat(b.props.children), [])
      .filter(Boolean)
      .map((element, index) =>
        cloneElement(element, {
          key: `${element.type.name}_${index}`,
          ...this.store.publicMethods,
          slideIndex,
          slideCount,
          fragmentIndex,
          fragmentCount,
          fragmentOrder
        })
      )
  }

  /**
   * @private
   */
  get slots() {
    return [Plugins, Elements]
  }

  /**
   * @private
   */
  get slides() {
    return Children.toArray(this.props.children).filter(
      child => !this.slots.includes(child.type)
    )
  }

  /**
   * Get the `children` by a range of `+-1` around the current slide.
   * It renders a maximum of 3 slides (previous, current, next)
   * This allows various transitions between slides.
   *
   * @private
   * @return {Array<Slide>} returns an array of max 3 slides
   */
  get visibleSlides() {
    const {slideIndex, direction, fragmentOrder, fragmentHosts} = this.store
    return (
      this.slides
        // Assign the original index for the Component
        .map((child, originalIndex) => ({child, originalIndex}))
        // Filter by a range of `+-1`
        // Filter first to reduce the number of clones
        // This will not allow us to get all fragments on init but
        // improves performance
        .filter((c, i) => range(i, slideIndex + 1, slideIndex - 1))
        // Modify the remaining slides (maximum of 3)
        .map(({child, originalIndex}) => {
          const {length: fragmentCount = 0} = fragmentHosts[originalIndex]
          const lastFragment = Math.max(0, fragmentCount - 1)
          // Flags to check for value
          const isCurrent = slideIndex === originalIndex
          const isPrev = slideIndex === originalIndex + 1
          const isNext = slideIndex === originalIndex - 1
          // Flags to check for directional movement
          // Slides could obviously move anywhere but this is something
          // we all understand
          const movesRight = direction === 1
          const movesLeft = direction === -1

          // Clone the element to add the logic
          return cloneElement(child, {
            direction,
            isPrev,
            isNext,
            isCurrent,
            key: `slide_${originalIndex}`,
            fragmentOrder: isCurrent
              ? fragmentOrder
              : isPrev ? lastFragment : 0,
            slideIndex: originalIndex,
            fromPrev: isCurrent && movesLeft,
            fromNext: isCurrent && movesRight,
            toPrev: isPrev && movesRight,
            toNext: isNext && movesLeft
          })
        })
    )
  }

  /**
   * @private
   * @return {Wrapper}
   *   The entire Deck inside a Wrapper
   */
  render() {
    return (
      <Wrapper mixin={this.props.mixin}>
        {this.plugins}
        {this.elements}
        <SlidesWrapper>{this.visibleSlides}</SlidesWrapper>
      </Wrapper>
    )
  }
}
