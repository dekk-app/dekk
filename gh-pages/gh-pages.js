import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'

import Deck, {Plugins} from '@dekk/deck'
import Fragment from '@dekk/fragment'
import Url from '@dekk/url'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'
import Listener from '@dekk/listener'

const handleSlide = slideIndex => {
  console.log(slideIndex)
}

const StyledPageNumber = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #222;
  color: #fff;
  height: 2rem;
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

const App = () => (
  <Deck>
    <Plugins>
      <Paging />
      <Url />
      <Listener onSlide={handleSlide} />
    </Plugins>
    <Plugins>
      <PageNumber />
    </Plugins>
    <Slide>
      <Fragment order={0}>0</Fragment>
      <Fragment order={1}>1</Fragment>
      <Fragment order={2}>2</Fragment>
      <Fragment order={3}>3</Fragment>
      <Fragment order={4}>4</Fragment>
      <Fragment order={5}>5</Fragment>
    </Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
  </Deck>
)

const mountPoint = document.getElementById('mount-point')

render(<App />, mountPoint)
