/* global window */
import React from 'react'
import {render} from 'react-dom'
import uuid from 'uuid/v4'

import Deck, {SpeakerDeck, Plugins} from '@dekk/deck'
import Url, {search} from '@dekk/url'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'

const plugins = (
  <Plugins>
    <Paging />
    <Url />
  </Plugins>
)

/**
 * Cover slide
 */
const cover = <Slide key={uuid()}>Welcome to Dekk!</Slide>

/**
 * Thank you slide
 */
const thankYou = <Slide key={uuid()}>THANK YOU!</Slide>

/**
 * A title
 */
const title = <Slide key={uuid()}>Presentations powered by</Slide>

/**
 * All slides besides cover and thankYou
 */
const content = [title]

/**
 * All slides
 */
const slides = [cover, ...content, thankYou]

/**
 * The app.
 * It switches modes depending on a property.
 *
 * @param {Object} props
 *   The properties
 * @param {Boolean} props.present
 *   If true the speaker deck is rendered
 */
const App = ({present}) =>
  present ? (
    <SpeakerDeck timer={20} timerWarning={5}>
      {plugins}
      {slides}
    </SpeakerDeck>
  ) : (
    <Deck>
      {plugins}
      {slides}
    </Deck>
  )

/**
 * Flag to set presenter mode
 */
const {present} = search.parse(window.location.href)

// render the app based on the window.location.search
render(<App present={present} />, document.getElementById('mount-point'))
