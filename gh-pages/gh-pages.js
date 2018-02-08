import React from 'react'
import {render} from 'react-dom'
import styled, {css, injectGlobal} from 'styled-components'

import Deck from '@dekk/deck'
import Store from '@dekk/store'
import Text, {Title, Subtitle} from '@dekk/text'

import createMaster, {Master, Static, Slot} from '@dekk/master'
import Fragment from '@dekk/fragment'

import {CoverSlide, Cover, ChapterSlide, Chapter} from './masters'

const cube = css`
  transform:
    perspective(200vmax)
    translate3d(0, 0, -50vw)
    rotate3d(0, 1, 0, calc(90deg * var(--time) * var(--direction)))
    translate3d(0, 0, 50vw);
    backface-visibility: hidden;
    transform-style: preserve-3d;
`

const zoom = css`
  transform: scale3d(calc(1 - var(--time)), calc(1 - var(--time)), 1);
  opacity: calc(1 - var(--time));
`

const bgImage = `
  linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,1)),
  url(https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg)
`

const fadeIn = css`
  transition:
    transform 0.25s ease-${props => props.active ? 'out' : 'in'},
    opacity 1s ease-${props => props.active ? 'in' : 'out'};
  opacity: ${props => props.active ? 1 : 0};
  transform: translate3d(0, ${props => props.active ? 0 : 100}%, 0);
`

const zoomIn = css`
  transition:
    transform 0.25s ease-${props => props.active ? 'out' : 'in'},
    opacity 1s ease-${props => props.active ? 'in' : 'out'};
  opacity: ${props => props.active ? 1 : 0};
  transform: scale3d(${props => props.active ? 1 : 0}, ${props => props.active ? 1 : 0}, 1);
`

const {Top, Bottom} = Chapter

const App = () => (
  <Deck>
    {/* Cover-slide */}
    <CoverSlide background={bgImage}
                animation={zoom}>
      <Cover.Top>
        <Title>Welcome to Dekk</Title>
      </Cover.Top>
      <Cover.Bottom>
        <Fragment fragment={1}
                  animation={fadeIn}>
          <Subtitle>
            A Presentation Tool
            <Fragment fragment={2}> powered</Fragment>
            <Fragment fragment={3}> by</Fragment>
            <Fragment fragment={4}> React</Fragment>
          </Subtitle>
        </Fragment>
      </Cover.Bottom>
    </CoverSlide>
    {/* Slide # 1 */}
    <ChapterSlide background={bgImage}
                  animation={zoom}>
      <Top>
        <Fragment fragment={1}
                  animation={zoomIn}>
          <Title>Slide 1</Title>
        </Fragment>
      </Top>
    </ChapterSlide>
    {/* Slide # 2 */}
    <ChapterSlide background={bgImage}
                  animation={cube}>
      <Chapter.Top>
        <Title>Slide 2</Title>
      </Chapter.Top>
    </ChapterSlide>
    {/* Slide # 3 */}
    <ChapterSlide background={bgImage}
                  animation={cube}>
      <Chapter.Top>
        <Title>Slide 3</Title>
      </Chapter.Top>
    </ChapterSlide>
    {/* Slide # 4 */}
    <ChapterSlide background={bgImage}
                  animation={cube}>
      <Chapter.Top>
        <Title>Slide 4</Title>
      </Chapter.Top>
    </ChapterSlide>
  </Deck>
)

const mountPoint = document.getElementById('mount-point')

render(<App />, mountPoint)
