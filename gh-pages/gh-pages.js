import React from 'react'
import {render} from 'react-dom'
import styled, {css} from 'styled-components'

import Deck, {Plugins, Elements} from '@dekk/deck'
import Fragment from '@dekk/fragment'
import Url from '@dekk/url'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'
import Listener from '@dekk/listener'
import createMaster, {Master, Slot} from '@dekk/master'

const handleSlide = slideIndex => {
  console.log(slideIndex)
}

const StyledPageNumber = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #222;
  color: #fff;
  height: var(--footer-height);
  width: 6rem;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-family: sans-serif;
`
const PageNumber = props => {
  return (
    <StyledPageNumber>
      {props.slideIndex + 1} / {props.slideCount}
    </StyledPageNumber>
  )
}

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: #000;
  color: #fff;
`

const dekkStyle = css`
  --header-height: 3rem;
  --footer-height: 3rem;
  padding-top: var(--header-height);
  padding-bottom: var(--footer-height);
`

const MasterSlide = createMaster(
  <Master>
    <Slot name="A" not={[Header]} />
    <Slot name="B" only={[Header]} />
    <Slot name="C" required />
  </Master>
)

const fadeUp = css`
  opacity: calc(1 - var(--time));
  transform: translate3d(0, calc(var(--time) * var(--direction, 1) * 100%), 0);
`

const fadeRight = css`
  opacity: calc(1 - var(--time));
  transform: translate3d(calc(var(--time) * var(--direction, 1) * -100%), 0, 0);
`

const fadeLeft = css`
  opacity: calc(1 - var(--time));
  transform: translate3d(calc(var(--time) * var(--direction, 1) * 100%), 0, 0);
`

const fadeDown = css`
  opacity: calc(1 - var(--time));
  transform: translate3d(0, calc(var(--time) * var(--direction, 1) * -100%), 0);
`

const App = () => (
  <Deck mixin={dekkStyle}>
    <Plugins>
      <Paging />
      <Url />
      <Listener onSlide={handleSlide} />
    </Plugins>
    <Elements>
      <Header> Dekk Elements </Header>
      <PageNumber />
    </Elements>
    <MasterSlide>
      <MasterSlide.A>
        <Header>Hello dekk</Header>
      </MasterSlide.A>
      <MasterSlide.B>Hello Dekk!</MasterSlide.B>
    </MasterSlide>

    {/* SLIDES */}
    <Slide animation={fadeDown}>
      <Fragment order={0}>0</Fragment>
      <Fragment order={1} animation={fadeDown}>
        1
      </Fragment>
      <Fragment order={2} animation={fadeRight}>
        2
      </Fragment>
      <Fragment order={3} animation={fadeLeft}>
        3
      </Fragment>
      <Fragment order={4} animation={fadeUp}>
        4
      </Fragment>
    </Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
    <Slide>
      <Fragment order={0}>0</Fragment>
      <Fragment order={1}>1</Fragment>
      <Fragment order={2}>2</Fragment>
      <Fragment order={3}>3</Fragment>
      <Fragment order={4}>4</Fragment>
      <Fragment order={5}>5</Fragment>
    </Slide>
    <Slide>
      <Fragment order={0}>0</Fragment>
      <Fragment order={1}>1</Fragment>
      <Fragment order={2}>2</Fragment>
      <Fragment order={3}>3</Fragment>
      <Fragment order={4}>4</Fragment>
      <Fragment order={5}>5</Fragment>
    </Slide>
  </Deck>
)

const mountPoint = document.getElementById('mount-point')

render(<App />, mountPoint)
