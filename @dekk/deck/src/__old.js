import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {observer} from 'mobx-react'
import {range} from '@dekk/utils'
import Store from '@dekk/store'
import Slide from '@dekk/slide'
import {search} from '@dekk/url'
import Wrapper from './wrapper'
import SlidesWrapper from './slides-wrapper'
import Plugins from './plugins'
import Elements from './elements'

export {Plugins, Elements}

/**
 * A wrapper around the slides. It includes a paging component to allow
 * navigating the slides and fragments.
 *
 * `<Deck/>` renders 3 slides (previous, current, next) to allow various
 * transitions.
 *
 * The internal store is handled by mobX. {@link https://github.com/mobxjs/}
 *
 * @class Deck
 * @reactProps {Object} props
 *   The properties
 * @reactProps {(Slide|Slide[])} props.children
 * @reactProps {?String} props.mixin
 * @reactProps {?Boolean} props.slave
 *
 * @example
 * import React from 'react'
 * import Deck from '@dekk/deck'
 * import Slide from '@dekk/slide'
 *
 * const appStyles = `
 *  background: #000;
 *  color: #fff;
 * `
 * const App = ({slave}) => (
 *   <Dekk mixin={appStyles}>
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
   * Constructor
   * @public
   * @param {Object} props
   *   The properties
   * @param {(Slide|Slide[]|Plugins|Plugins[])} props.children
   * @param {?String} props.mixin
   * @param {?Boolean} props.slave
   */
  constructor(props) {
    super(props)
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
    this.buildFragmentHosts()
  }

  /**
   * @private
   */
  componentWillReceiveProps(newProps) {
    // Rebuild fragmentHost when children change
    // this will prevent undefined hosts while reducing the number
    // of calls
    if (newProps.children !== this.props.children) {
      this.buildFragmentHosts()
    }
  }

  /**
   * @private
   */
  buildFragmentHosts() {
    this.slides.forEach((child, index) => {
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
    const {children} = this.props
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
          const {length: fragmentCount = 0} = this.store.fragmentHosts[
            originalIndex
          ]
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
   *   The entire Deck including paging logic inside a Wrapper
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

const lastStyle = css`
  background: #000;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
`

const presenterStyles = css`
  background: ${({theme}) => (theme === 'dark' ? '#111' : '#eee')};
  color: ${({theme}) => (theme === 'dark' ? '#fff' : '#000')};
`

const {layout = 0, theme = 'dark', playing: isPlaying} = search.parse(
  window.location.href
)

@observer
export class SpeakerDeck extends Deck {
  state = {
    layout,
    theme,
    isPlaying
  }

  // overwrite the visible slides
  get visibleSlides() {
    const {slideIndex, direction, fragmentOrder, fragmentIndex} = this.store

    // Get the current fragmentHost
    // and create a boolean flag to check for fragments
    const fragmentHost = this.store.fragmentHosts[slideIndex]
    const hasFragments = fragmentHost.length - fragmentIndex > 1

    // Show a note instead of an empty space if no more slides exist
    const lastSlide = <Slide mixin={lastStyle}>End of presentation</Slide>

    // We need a maximum of 2 slides `[current, next]`
    const filteredSlides = this.slides.filter((c, i) =>
      range(i, slideIndex + 1, slideIndex - 1)
    )

    const prevSlide = filteredSlides.length > 2 ? filteredSlides[0] : null
    const currentSlide =
      filteredSlides.length > 2 ? filteredSlides[1] : filteredSlides[0]
    const nextSlide =
      filteredSlides.length > 2
        ? filteredSlides[2]
        : filteredSlides[1] || lastSlide

    // Build properties for all slides
    const props = {
      shared: {
        direction: 0,
        present: true
      },
      current: {
        isCurrent: true,
        fragmentOrder: fragmentOrder,
        slideIndex: slideIndex
      },
      next: {
        isNext: true,
        slideIndex: hasFragments ? slideIndex : slideIndex + 1,
        fragmentOrder: hasFragments ? fragmentHost[fragmentIndex + 1] : 0
      }
    }

    const currentView = cloneElement(currentSlide, {
      ...props.shared,
      ...props.current,
      key: 'currentView'
    })

    // The "pre-view" is either the current slide or the next slide
    // depending on the fragemnt flag
    const preView = hasFragments ? currentSlide : nextSlide
    const nextView = cloneElement(preView, {
      ...props.shared,
      ...props.next,
      key: 'nextView'
    })

    const preloadNextView = hasFragments
      ? cloneElement(nextSlide, {
          slideIndex: slideIndex + 1,
          fragmentOrder: 0,
          key: 'preloadNextView'
        })
      : null

    const preloadPrevView = prevSlide
      ? cloneElement(prevSlide, {
          slideIndex: slideIndex - 1,
          fragmentOrder: this.store.fragmentHosts[
            Math.max(0, slideIndex - 1)
          ].reverse()[0],
          isPrev: true,
          key: 'preloadPrevtView'
        })
      : null

    // only return 2 slides
    return [currentView, nextView, preloadNextView, preloadPrevView]
  }

  get presenterSection() {
    const fragmentCount = Math.max(
      0,
      this.store.fragmentHosts[this.store.slideIndex].length - 1
    )
    return (
      <StyledPresenter>
        page: {this.store.slideIndex}
        <br />
        fragment: {this.store.fragmentIndex} / {fragmentCount}
      </StyledPresenter>
    )
  }

  switchLayout() {
    const layout = (this.state.layout + 1) % layouts.length
    this.setState({layout})
    search.write({layout})
  }

  switchTheme() {
    const theme = this.state.theme === 'dark' ? 'light' : 'dark'
    this.setState({theme})
    search.write({theme})
  }

  togglePlaying() {
    const isPlaying = !this.state.isPlaying
    this.setState({isPlaying})
    search.write({playing: isPlaying})
  }

  get layoutToggle() {
    return (
      <StyledLayoutToggle
        onClick={this.switchLayout.bind(this)}
        theme={this.state.theme}>
        <svg
          style={{
            width: '1em',
            height: '1em'
          }}
          viewBox="0 0 24 24">
          <path
            fill="currentcolor"
            d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H11V3M13,3V11H21V5C21,3.89 20.11,3 19,3M13,13V21H19C20.11,21 21,20.11 21,19V13"
          />
        </svg>
      </StyledLayoutToggle>
    )
  }

  get themeToggle() {
    return (
      <StyledThemeToggle
        onClick={this.switchTheme.bind(this)}
        theme={this.state.theme}>
        <svg
          style={{
            width: '1em',
            height: '1em'
          }}
          viewBox="0 0 24 24">
          <path
            fill="currentcolor"
            d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z"
          />
        </svg>
      </StyledThemeToggle>
    )
  }

  get playButton() {
    const icon = this.state.isPlaying
      ? 'M14,19H18V5H14M6,19H10V5H6V19Z'
      : 'M8,5.14V19.14L19,12.14L8,5.14Z'
    return (
      <StyledPlayButton
        onClick={this.togglePlaying.bind(this)}
        theme={this.state.theme}>
        <svg
          style={{
            width: '1em',
            height: '1em'
          }}
          viewBox="0 0 24 24">
          <path fill="currentcolor" d={icon} />
        </svg>
      </StyledPlayButton>
    )
  }

  /**
   * @private
   * @return {Wrapper}
   *   The entire Deck including paging logic inside a Wrapper
   */
  render() {
    const [view, preview, preloadNext, preloadPrev] = this.visibleSlides
    return (
      <Wrapper
        mixin={css`
          ${this.props.mixin};
          ${presenterStyles};
        `}
        theme={this.state.theme}>
        <SpeakerWrapper layout={this.state.layout}>
          <StyledControls>
            {this.playButton}
            {this.layoutToggle}
            {this.themeToggle}
            <PageNumber>
              {this.store.slideIndex + 1} / {this.slides.length}
            </PageNumber>
            <FragmentNumber>
              {this.store.fragmentIndex} /{' '}
              {Math.max(
                0,
                this.store.fragmentHosts[this.store.slideIndex].length - 1
              )}
            </FragmentNumber>
            <StyledControl1>Controls 1</StyledControl1>
            <StyledControl2>
              <Countdown
                isRunning={this.state.isPlaying}
                end={this.props.timer}
                render={renderCountdown}
              />
            </StyledControl2>
          </StyledControls>
          <StyledPreload>
            {preloadPrev}
            {preloadNext}
          </StyledPreload>
          <StyledView>{view}</StyledView>
          <StyledPreview>{preview}</StyledPreview>
          <StyledNotes>
            <NoteProvider notes={this.store.notes[this.store.slideIndex]} />
          </StyledNotes>
        </SpeakerWrapper>
        {this.plugins}
        {this.elements}
      </Wrapper>
    )
  }
}

const date = new Date()

const leadingZero = n => (n < 10 ? `0${n}` : n)

const NoteProvider = ({notes}) => (
  <div>
    {Children.toArray(notes).map((note, i) => cloneElement(note, {key: i}))}
  </div>
)

const renderCountdown = (days, hours, minutes, seconds, done) => (
  <StyledCountDown>
    {leadingZero(hours)}:{leadingZero(minutes)}:{leadingZero(seconds)}
  </StyledCountDown>
)

const StyledCountDown = styled.div`
  font-size: 2rem;
`

const StyledControls = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem 0;
  box-sizing: border-box;
  grid-area: Controls;
  display: grid;
  grid-template-rows: 2rem auto;
  grid-template-columns: 3.5rem 3.5rem 1fr 1fr 2rem 2rem 2rem;
  grid-gap: 1rem;
  grid-template-areas:
    'PageNumber FragmentNumber . . PlayButton ThemeToggle LayoutToggle'
    'Control1 Control1 Control1 Control2 Control2 Control2 Control2';
`

const toggleStyle = css`
  background: ${({theme}) => (theme === 'dark' ? '#222' : '#ddd')};
  color: ${({theme}) => (theme === 'dark' ? '#ddd' : '#222')};
  box-shadow: 0 0 0 1px ${({theme}) => (theme === 'dark' ? '#333' : '#ccc')}
    inset;
  border: 0;
  border-radius: 3px;
  height: 2rem;
  width: 2rem;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({theme}) => (theme === 'dark' ? '#333' : '#ccc')};
  }

  &:active {
    background: ${({theme}) => (theme === 'dark' ? '#444' : '#bbb')};
  }

  &:focus {
    outline: 0;
    background: highlight;
  }
`

const StyledLayoutToggle = styled.button`
  grid-area: LayoutToggle;
  ${toggleStyle};
`

const StyledThemeToggle = styled.button`
  grid-area: ThemeToggle;
  ${toggleStyle};
`

const StyledPlayButton = styled.button`
  grid-area: PlayButton;
  ${toggleStyle};
`
const StyledPreload = styled.div`
  display: none;
`

const StyledView = styled.div`
  --scale: var(--view-scale);
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: View;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`
const StyledPreview = styled.div`
  --scale: var(--preview-scale);
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: Preview;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

const StyledNotes = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: Notes;
  background: #fff;
  color: #000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

const StyledControl1 = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: Control1;
  background: #fff;
  color: #000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

const PageNumber = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  grid-area: PageNumber;
`

const FragmentNumber = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  grid-area: FragmentNumber;
`

const StyledControl2 = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: Control2;
  background: #fff;
  color: #000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

const layouts = [
  css`
    --view-scale: 0.66;
    --preview-scale: 0.33;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      'View Controls'
      'View Preview'
      'Notes Notes';
  `,
  css`
    --view-scale: 0.66;
    --preview-scale: 0.33;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      'View Preview'
      'View Controls'
      'Notes Notes';
  `,
  css`
    --view-scale: 0.5;
    --preview-scale: 0.5;
    grid-template-rows: 2fr 5fr 3fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'Controls Controls'
      'View Preview'
      'Notes Notes';
  `,
  css`
    --view-scale: 0.33;
    --preview-scale: 0.66;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      'View Preview'
      'Controls Preview'
      'Notes Notes';
  `,
  css`
    --view-scale: 0.33;
    --preview-scale: 0.66;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      'Controls Preview'
      'View Preview'
      'Notes Notes';
  `
]

const SpeakerWrapper = styled.div`
  flex: 1 0 100%;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: grid;
  box-sizing: border-box;
  grid-gap: 1rem;
  padding: 1rem;
  ${({layout}) => layouts[layout]};
`

const StyledPresenter = styled.div`
  position: absolute;
  z-index: 3;
  top: calc(50% + 1rem);
  right: 1rem;
  left: 1rem;
  height: 7rem;
  padding: 1rem;
  box-sizing: border-box;
  background: #000;
  color: #fff;
  font-size: 2rem;
  line-height: 1.25;
`

const dateHelpers = {
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000
}

class Countdown extends Component {
  constructor(props) {
    super(props)
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
  get now() {
    return new Date()
  }
  get then() {
    return this.state.start + this.state.waited + this.props.end * dateHelpers.m
  }
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
      requestAnimationFrame(this.run)
    } else {
      this.stop()
    }
  }
  stop() {
    cancelAnimationFrame(this.run)
  }

  componentWillMount() {
    this.setState({
      start: this.now.getTime(),
      minutes: this.props.end
    })
    if (this.props.isRunning) {
      this.run()
    } else {
      this.setState({
        waiting: this.now.getTime()
      })
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isRunning && !this.props.isRunning) {
      this.setState({
        waited: this.state.waited + (this.now.getTime() - this.state.waiting)
      })
      this.run(true)
    } else if (!newProps.isRunning && this.props.isRunning) {
      this.setState({
        waiting: this.now.getTime()
      })
      this.stop()
    }
  }

  componentWillUnmount() {
    this.stop()
  }
  render() {
    const {days, hours, minutes, seconds, done} = this.state
    return this.props.render(days, hours, minutes, seconds, done)
  }
}
