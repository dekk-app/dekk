# Dekk

<p align="center"><img width="300" src="https://raw.githubusercontent.com/sinnerschrader/dekk/master/resources/logo.png" alt="Dekk logo"/></p>

A presentation tool written in **react.js**.


### Creating master slides

**`master-slide.js`**

```jsx
import React from 'react'

// Dekk components
import {
  Title,
  Subtitle
} from '@dekk/text'
import createMaster, {
  Master,
  Static,
  Slot
} from '@dekk/master'

// Custom components
import Header from './components/text'
import SomeComponent from './components/some-component'

export default createMaster(
  <Master className='my-master-slide'>
    <Static name='Header'>
      <Header/>
    </Static>
    <Slot name='Top'
          only={[Title]}
          required/>
    <Slot name='Bottom'
          only={[Subtitle, SomeComponent]}/>
  </Master>
)

```

**`app.js`**

```jsx
import React from 'react'
import {render} from 'react-dom'
import Deck from '@dekk/deck'
import {
  Title,
  Subtitle
} from '@dekk/text'
import Slide from '@dekk/slide'
import Master from './master-slide'
import SomeComponent from './components/some-component'

const App = () => (
  <Deck>
    <Master>
      <Master.Top>
        <Title>hello dekk</Title>
      </Master.Top>
      <Master.Bottom>
        <Subtitle>a subtitle</Subtitle>
        <SomeComponent/>
      </Master.Bottom>
    </Master>
    <Slide>
      <Title>a title</Title>
    </Slide>
    <Slide background='url("./background.jpg")'>
      <Title>a title</Title>
    </Slide>
  </Deck>
)

const mountPoint = document.getElementById('mount-point')

render(<App/>, mountPoint)

```

© Copyright 2018 [Gregor Adams](https://github.com/pixelass)  
Proudly powered by [Sinnerschrader](https://sinnerschrader.com)([Github](https://github.com/sinnerschrader))
