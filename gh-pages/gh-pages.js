import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'

import Deck from '@dekk/deck'

import createMaster, {
  Master,
  Static,
  Slot
} from '@dekk/master'

const renderMaster = (master, cb) => cb(master)

const Slide = createMaster(
  <Master>
    <Slot name='Top'
          required/>
    <Slot name='Bottom'/>
  </Master>
)


const App = () => (
  <Deck page={1}>
    <Slide>
      <Slide.Top>Top</Slide.Top>
      <Slide.Bottom>Bottom</Slide.Bottom>
    </Slide>
    <Slide>
      <Slide.Top>Top</Slide.Top>
      <Slide.Bottom>Bottom</Slide.Bottom>
    </Slide>
    <Slide>
      <Slide.Top>Top</Slide.Top>
      <Slide.Bottom>Bottom</Slide.Bottom>
    </Slide>
  </Deck>
)

const mountPoint = document.getElementById('mount-point')

render(<App/>, mountPoint)
