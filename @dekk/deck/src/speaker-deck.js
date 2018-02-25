/* global window */
import React, {cloneElement} from 'react'
import {css} from 'styled-components'
import {observer} from 'mobx-react'
import {range} from '@dekk/utils'
import Slide from '@dekk/slide'
import {Title} from '@dekk/text'
import {search} from '@dekk/url'
import Timer, {renderCountdown} from '@dekk/countdown'

import Wrapper from './wrapper'
import SpeakerWrapper from './speaker-wrapper'
import Deck from './deck'
import Controls, {
  PageNumber,
  FragmentNumber,
  ControlA,
  ControlB,
  LayoutToggle,
  ThemeToggle,
  PlayButton,
  Countdown,
  Label
} from './controls'

import View, {Preload, Nextview, Preview} from './views'

import NoteProvider, {Notes} from './notes'
import layouts from './layouts'

const emptyStyle = css`
  background: #000;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
`

const endOfPresentation = (
  <Slide mixin={emptyStyle}>
    <Title>End of presentation</Title>
  </Slide>
)

const presenterStyles = css`
  background: ${({theme}) => (theme === 'dark' ? '#111' : '#eee')};
  color: ${({theme}) => (theme === 'dark' ? '#fff' : '#000')};
`

const nOf = (n, {length}) =>
  `${n + (length > 0 ? 1 : 0)} / ${Math.max(0, length)}`

const {layout = 0, theme = 'light', playing: isPlaying} = search.parse(
  window.location.href
)

@observer
export default class SpeakerDeck extends Deck {
  state = {layout, theme, isPlaying}

  constructor(props, context) {
    super(props, context)
    this.switchLayout = this.switchLayout.bind(this)
    this.switchTheme = this.switchTheme.bind(this)
    this.togglePlaying = this.togglePlaying.bind(this)
  }

  get speakerSlides() {
    const {slideIndex, fragmentOrder, fragmentIndex} = this.store

    // Get the current fragmentHost
    // and create a boolean flag to check for fragments
    const fragmentHost = this.store.fragmentHosts[slideIndex]
    const hasFragments = fragmentHost.length - fragmentIndex > 1

    // We need a maximum of 2 slides `[current, next]`
    const filteredSlides = this.slides.filter((c, i) =>
      range(i, slideIndex + 2, slideIndex)
    )

    const [
      currentSlide,
      nextSlide = endOfPresentation,
      realNextSlide = endOfPresentation
    ] = filteredSlides

    const currentView = cloneElement(currentSlide, {
      fragmentOrder,
      slideIndex,
      direction: 0,
      present: true,
      isCurrent: true,
      key: 'currentView'
    })

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

    // The "real next-view" is the next view after the preview.
    // This is either the current view `+1` or `+2`
    const realNextView = cloneElement(
      hasFragments ? nextSlide : realNextSlide,
      {
        direction: 0,
        present: true,
        isNext: true,
        slideIndex: hasFragments ? slideIndex + 1 : slideIndex + 2,
        isPreview: true,
        key: 'realNextView'
      }
    )

    // Only return 3 slides
    return [currentView, nextView, realNextView]
  }

  switchLayout() {
    this.setState(prevState => {
      const layout = (prevState.layout + 1) % layouts.length
      search.write({layout})
      return {layout}
    })
  }

  switchTheme() {
    this.setState(prevState => {
      const theme = prevState.theme === 'dark' ? 'light' : 'dark'
      search.write({theme})
      return {theme}
    })
  }

  togglePlaying() {
    this.setState(prevState => {
      const isPlaying = !prevState.isPlaying
      search.write({playing: isPlaying})
      return {isPlaying}
    })
  }

  get layoutToggle() {
    return (
      <LayoutToggle
        key="LayoutToggle"
        onClick={this.switchLayout}
        theme={this.state.theme}
      />
    )
  }

  get themeToggle() {
    return (
      <ThemeToggle
        key="ThemeToggle"
        onClick={this.switchTheme}
        theme={this.state.theme}
        isDark={this.state.theme === 'dark'}
      />
    )
  }

  get playButton() {
    return (
      <PlayButton
        key="PlayButton"
        onClick={this.togglePlaying}
        theme={this.state.theme}
        isPlaying={this.state.isPlaying}
      />
    )
  }

  get toggles() {
    return [this.playButton, this.themeToggle, this.layoutToggle]
  }

  /**
   * @private
   * @return {Wrapper}
   *   The entire Deck including paging logic inside a Wrapper
   */
  render() {
    const [view, preview, nextView] = this.speakerSlides
    const mixin = css`
      ${this.props.mixin};
      ${presenterStyles};
    `
    const slideNof = nOf(this.store.slideIndex, this.slides)
    const fragmentNof = nOf(
      this.store.fragmentIndex,
      this.store.fragmentHosts[this.store.slideIndex]
    )
    const countdown = {
      isRunning: this.state.isPlaying,
      end: this.props.timer,
      timerWarning: this.props.timerWarning || 0,
      render: renderCountdown
    }
    return (
      <Wrapper mixin={mixin} theme={this.state.theme}>
        {this.plugins}
        {this.elements}
        <Preload>{this.visibleSlides}</Preload>
        <SpeakerWrapper layout={this.state.layout}>
          <Controls layout={this.state.layout}>
            {this.toggles}
            <PageNumber theme={this.state.theme}>
              <Label>Slide</Label>
              {slideNof}
            </PageNumber>
            <FragmentNumber theme={this.state.theme}>
              <Label>Fragment</Label>
              {fragmentNof}
            </FragmentNumber>
            <ControlA />
            <ControlB>
              <Label>Time remaining</Label>
              <Countdown>
                <Timer {...countdown} />
              </Countdown>
            </ControlB>
          </Controls>
          <View>{view}</View>
          <Preview>{preview}</Preview>
          <Nextview layout={this.state.layout}>{nextView}</Nextview>
          <Notes>
            <NoteProvider>
              {this.store.notes[this.store.slideIndex]}
            </NoteProvider>
          </Notes>
        </SpeakerWrapper>
      </Wrapper>
    )
  }
}
