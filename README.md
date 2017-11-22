# Dekk

A presentation tool written in **react.js**.

> Nothing to see here except a prototype !!!
> There might be errors when trying to build or develop the app.
> This project is at an early stage and still needs some seatbelts.

## npm / yarn (not available yet)

```shell
npm i dekk --S ## yarn add dekk
```

> This space does not exist in npm yet. Don't expect it to work. 💩


## Don't install with **yarn** (development)

This project uses husky and therefore requires to be installed with npm

```shell
npm i ## npm install
```


### To develop the web app

```shell
yarn dev:web ### npm run dev:web
```


### To develop dekk

```shell
yarn dev:demo ### npm run dev:demo
```


### Creating master slides

**`master-slide.js`**

```jsx
import React from 'react'

// Dekk components
import {
  Title,
  Subtitle
} from 'path/to/src/components/text'
import createMaster, {
  Master,
  Static,
  Slot
} from 'path/to/src/components/master'

// Own components
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
import Deck from 'path/to/src'
import {
  Title,
  Subtitle
} from 'path/to/src/components/text'
import Slide from 'path/to/src/components/slide'
import Master from './master-slide'
import SomeComponent from './components/some-component'

const App = () => (
  <Deck>
    <Master>
      <Master.Top>
        <Title>Hello Dekk!</Title>
      </Master.Top>
      <Master.Bottom>
        <Subtitle>next generation presatation tool!</Subtitle>
        <SomeComponent/>
      </Master.Bottom>
    </Master>
    <Slide>
      <Title>This is not a master slide</Title>
    </Slide>
    <Slide background='url("./background.jpg")'>
      <Title>Slides are easy</Title>
    </Slide>
  </Deck>
)

const mountPoint = document.getElementById('mountPoint')

render(<App/>, mountPoint)

```
