import React from 'react'
import {render} from 'react-dom'

import Deck from '@dekk/deck'
import Fragment from '@dekk/fragment'
import Slide from '@dekk/slide'

const App = () => (
  <Deck>
    <Slide>
      Slide <Fragment order={1}>1</Fragment>
    </Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
  </Deck>
)

const mountPoint = document.getElementById('mount-point')

render(<App />, mountPoint)
