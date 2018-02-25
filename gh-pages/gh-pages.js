/* global window */
import React from 'react'
import {render} from 'react-dom'
import uuid from 'uuid/v4'
import styled, {css} from 'styled-components'

import Deck, {SpeakerDeck, Plugins, Elements} from '@dekk/deck'
import Url, {search} from '@dekk/url'
import Slide from '@dekk/slide'
import Fragment from '@dekk/fragment'
import Notes from '@dekk/speaker-notes'
import Image from '@dekk/image'
import Text, {Title, Subtitle, Uppercase} from '@dekk/text'
import {fadeSlide, flip, cube} from '@dekk/animation'
import Paging from '@dekk/paging'

import {
  CoverSlide,
  Cover,
  ChapterSlide,
  Chapter,
  HalfSlide,
  Half,
  CollageSlide,
  Collage,
  baseStyles
} from './masters'

import redImage from './assets/red.jpg'
import greenImage from './assets/green.jpg'

import {red, green, blue, grey, black} from './design-system'

const StyledHeader = styled.header`
  background: var(--header-background);
  color: var(--header-color);
  height: var(--header-height);
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0 1rem;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  font-size: 1rem;
`
const Header = () => <StyledHeader>Dekk Tutorial</StyledHeader>

const StyledFooter = styled.footer`
  background: var(--footer-background);
  color: var(--footer-color);
  height: var(--footer-height);
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0 1rem;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 1rem;
`
const Footer = () => <StyledFooter>Dekk Tutorial</StyledFooter>

const plugins = (
  <Plugins>
    <Paging />
    <Url />
  </Plugins>
)

const elements = (
  <Elements>
    <Header />
    <Footer />
  </Elements>
)

const baseMixin = css`
  ${baseStyles};
  --slide-background: ${black.main};
  --slide-color: white;
`

const deckMixin = css`
  ${baseMixin};
  --header-height: 3rem;
  --header-background: ${red.main};
  --header-color: white;
  --footer-height: 2rem;
  --footer-background: ${grey.main};
  --footer-color: black;
  padding: var(--header-height, 0) 0 var(--footer-height, 0);
`

const speakerMixin = css`
  ${baseMixin};
`

/**
 * Cover slide
 */
const cover = (
  <CoverSlide key={uuid()}>
    <Cover.A>
      <Title>Welcome to Dekk!</Title>
    </Cover.A>
    <Cover.B>
      <Subtitle>Presentations done right</Subtitle>
    </Cover.B>
    <Notes>
      <Text>
        Dekk is a presentation tool. It does things different but it does them
        right. Dekk is still a prerelease but we are happy to support you if you
        want to test and help develop Dekk.
      </Text>
    </Notes>
  </CoverSlide>
)

/**
 * Thank you slide
 */
const thankYou = (
  <CoverSlide key={uuid()} background={blue.main}>
    <Cover.A>
      <Title>Thank you!</Title>
    </Cover.A>
    <Cover.B>
      <Subtitle>
        <Fragment order={1} animation={fadeSlide.in.reverse}>
          very
        </Fragment>{' '}
        <Fragment order={2} animation={fadeSlide.in.down}>
          very
        </Fragment>{' '}
        <Fragment order={3} animation={fadeSlide.in.normal}>
          much
        </Fragment>
      </Subtitle>
    </Cover.B>
  </CoverSlide>
)

/**
 * A title example
 */
const title = (
  <ChapterSlide key={uuid()} background={red.main}>
    <Chapter.A>
      <Title>Presentations powered by React.js</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>styled-components</Subtitle>
      <Subtitle>react-motion</Subtitle>
      <Subtitle>mobX</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>
        Dekk is powered by React.js and can therfore host any react component or
        even entire applications.
      </Text>
    </Notes>
  </ChapterSlide>
)

const highlight = css`
  ${({isActive}) => (isActive ? `color: ${red.main}` : '')};
`

const imageFragment = css`
  display: block;
  width: 100%;
  height: 100%;
  opacity: calc(1 - var(--time));
  --image-height: 100%;
  --image-width: 100%;
`
/**
 * A fragment example
 */
const fragment = (
  <CollageSlide key={uuid()}>
    <Collage.A>
      <Title>Fragments</Title>
      <Text>
        A slide can be devided into different{' '}
        <Fragment order={1} animation={highlight}>
          fragments
        </Fragment>. Fragments are sorted by{' '}
        <Fragment order={2} animation={highlight}>
          order
        </Fragment>, which allows multiple fragments to appear at the{' '}
        <Fragment order={3} animation={highlight}>
          same time
        </Fragment>.
      </Text>
    </Collage.A>
    <Collage.B>
      <Fragment order={1} animation={imageFragment}>
        <Image
          src={redImage}
          alt="fragment 1, red image, a woman  with guitar"
        />
      </Fragment>
    </Collage.B>
    <Collage.C>
      <Fragment order={3} animation={imageFragment}>
        <Image
          src={greenImage}
          alt="fragment 2, green image, a man jumping up the stairs"
        />
      </Fragment>
    </Collage.C>
    <Notes>
      <Text>
        Dekk allows you to add page fragments. These tiny helpers are very
        useful and pretty flexible. Fragments are based on an order, which
        allows several fragments to get activated at the same time. You can
        choose from presets or write your own animations and/or transitions.
      </Text>
    </Notes>
  </CollageSlide>
)

/**
 * An animation example
 */
const animation_1 = (
  <ChapterSlide key={uuid()} animationOut={flip.x}>
    <Chapter.A>
      <Title>Animations</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>that shine</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>Dekk allows you to add animations or transitions to slides.</Text>
    </Notes>
  </ChapterSlide>
)

/**
 * An animation example
 */
const animation_2 = (
  <ChapterSlide key={uuid()} animationIn={flip.x} animationOut={flip.y}>
    <Chapter.A>
      <Title>Different effects</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>on enter and leave</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>Animations can be defined as in, out or both</Text>
    </Notes>
  </ChapterSlide>
)

/**
 * An animation example
 */
const animation_3 = (
  <ChapterSlide key={uuid()} animationIn={flip.y} animationOut={cube.slideX}>
    <Chapter.A>
      <Title>Flip, Cube, Slide, Fade</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>You can decide</Subtitle>
      <Subtitle>or write your own</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>Dekk provides default animations.</Text>
    </Notes>
  </ChapterSlide>
)

/**
 * An animation example
 */
const animation_4 = (
  <ChapterSlide key={uuid()} animationIn={cube.slideX}>
    <Chapter.A>
      <Title>Animation are just CSS</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>with some CSS variable magic</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>Dekk uses CSS variables under the hood.</Text>
    </Notes>
  </ChapterSlide>
)

/**
 * All slides besides cover and thankYou
 */
const content = [
  title,
  fragment,
  animation_1,
  animation_2,
  animation_3,
  animation_4
]

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
    <SpeakerDeck timer={20} timerWarning={5} mixin={speakerMixin}>
      {plugins}
      {slides}
    </SpeakerDeck>
  ) : (
    <Deck mixin={deckMixin}>
      {elements}
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
