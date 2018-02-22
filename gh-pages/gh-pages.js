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

import {cube, fade, fadeSlide} from '@dekk/animation'

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
  --slide-background: #333;
  --slide-color: #fff;
  font-family: sans-serif;
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
    <MasterSlide animation={cube.slideX}>
      <MasterSlide.A>
        <Header>Hello dekk</Header>
      </MasterSlide.A>
      <MasterSlide.B>Hello Dekk!</MasterSlide.B>
    </MasterSlide>

    {/* SLIDES */}
    <Slide animation={cube.slideX}>
      <Fragment order={0}>0</Fragment>
      <Fragment order={1} animation={fadeSlide.out.normal}>
        1
      </Fragment>
      <Fragment order={2} animation={fadeSlide.in.normal}>
        2
      </Fragment>
      <Fragment order={3} animation={fadeSlide.in.normal}>
        3
      </Fragment>
      <Fragment order={4} animation={fadeSlide.in.normal}>
        4
      </Fragment>
    </Slide>
    <Slide animation={cube.slideX}>Slide 2</Slide>
    <Slide animation={cube.slideX}>Slide 3</Slide>
    <Slide animation={cube.slideX}>
      <Fragment order={1} root>
        a
        <Fragment order={2} root>
          b
          <Fragment order={3} root>
            c
            <Fragment order={1}>d</Fragment>
          </Fragment>
        </Fragment>
      </Fragment>
      <Fragment order={61}>e</Fragment>
      <Fragment order={11}>f</Fragment>
      <Fragment order={31}>g</Fragment>
      <Fragment order={71}>h</Fragment>
      <Fragment order={32}>i</Fragment>
      <Fragment order={52}>j</Fragment>
      <Fragment order={621}>k</Fragment>
      <Fragment order={111}>l</Fragment>
      <Fragment order={23}>m</Fragment>
      <Fragment order={58}>n</Fragment>

      <Fragment order={0}>0</Fragment>
      <Fragment order={1} animation={fade.in}>
        1
      </Fragment>
      <Fragment order={4} animation={fadeSlide.out.up}>
        <Fragment order={2} animation={fadeSlide.in.reverse}>
          2(4)
        </Fragment>
      </Fragment>
      <Fragment order={3} animation={fadeSlide.out.down}>
        3
      </Fragment>
      <Fragment order={5} animation={fadeSlide.out.reverse}>
        5
      </Fragment>
      <Fragment order={6} animation={fadeSlide.out.normal}>
        6
      </Fragment>
    </Slide>
    <Slide animation={cube.slideX}>
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
