import React, {Children} from 'react'
import {render} from 'react-dom'
import classNames from 'classnames'

import Deck from '../src'
import Slide from '../src/components/slide'
import {Title} from '../src/components/text'


const App = props => (
  <Deck>
    <Slide>
      <Title>Hello Dekk!</Title>
    </Slide>
  </Deck>
)

const mountPoint = document.getElementById('mountPoint')

render(<App/>, mountPoint)
