# Examples

## Basic Example

To get started you can copy the following code. 
This example adds a Deck with 3 slides.
It enables paging and adds url handling.

```jsx
import React from 'react'
import {render} from 'react-dom'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'
import Url from '@dekk/url'

const App = () => (
  <Deck>
    <Plugins>
      <Paging/>
      <Url/>
    </Plugins>
    <Slide>This is slide <strong>1</strong>.</Slide>
    <Slide>This is slide <strong>2</strong>.</Slide>
    <Slide>This is slide <strong>3</strong>.</Slide>
  </Deck>
)

render(<App/>, document.getElementById('app'))
```

## Changing the transitions 

To use other transitions you only need to add one more package. 
This example adds a Deck with 5 slides.
It shows how animations are configured.
It enables paging and adds url handling.

```jsx
import React from 'react'
import {render} from 'react-dom'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'
import Url from '@dekk/url'
import {cube} from '@dekk/animation'

const App = () => (
  <Deck>
    <Plugins>
      <Paging/>
      <Url/>
    </Plugins>
    <Slide>This is slide <strong>1</strong></Slide>
    <Slide animationOut={cube.slideX}>
      This is slide <strong>2</strong>.
      <br/>
      It rotates as a cube when leaving.
    </Slide>
    <Slide animation={cube.slideX}>
      This is slide <strong>3</strong>.
      <br/>
      It rotates as a cube when leaving and entering.
    </Slide>
    <Slide animationIn={cube.slideX}>
      This is slide <strong>4</strong>.
      <br/>
      It rotates as a cube when entering.
    </Slide>
    <Slide>This is slide <strong>5</strong></Slide>
  </Deck>
)

render(<App/>, document.getElementById('app'))
```

## Using fragments

To use fragments you only need to add one more package. 
This example adds a Deck with 3 slides.
It shows how fragments behave.
It enables paging and adds url handling.

```jsx
import React from 'react'
import {render} from 'react-dom'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'
import Url from '@dekk/url'
import Fragment from '@dekk/fragment'
import {fadeSlide} from '@dekk/animation'

const App = () => (
  <Deck>
    <Plugins>
      <Paging/>
      <Url/>
    </Plugins>
    <Slide>
      <Fragment 
        order={1}
        animation={fadeSlide.in.reverse}>This is</Fragment>{' '}
      <Fragment 
        order={2}
        animation={fadeSlide.in.up}>slide</Fragment>{' '}
      <Fragment 
        order={3}
        animation={fadeSlide.in.down}>1</Fragment>
      <Fragment 
        order={4}
        animation={fadeSlide.in.up}>, with different</Fragment>
      <Fragment 
        order={5}
        animation={fadeSlide.in.normal}>animations.</Fragment>
    </Slide>
    <Slide>
      <Fragment order={1}>This is</Fragment>{' '}
      <Fragment order={2} root>slide{' '}
        <Fragment order={3}>2</Fragment>
        <Fragment order={4}>, with nested</Fragment>{' '}
        <Fragment order={5}>fragments.</Fragment>
      </Fragment>
    </Slide>
    <Slide>
      <Fragment order={1}>This is</Fragment>{' '}
      <Fragment order={2} root>slide{' '}
        <Fragment order={1}>3</Fragment>
        <Fragment order={2}>, using a</Fragment>{' '}
        <Fragment order={3}>root fragment.</Fragment>
      </Fragment>
    </Slide>
  </Deck>
)

render(<App/>, document.getElementById('app'))
```

## Using master slides

To use master slides you need to add several packages.
This example adds a Deck with 3 slides.
It enables paging and adds url handling.
It uses master slides instead of plain slides.

```jsx
import React from 'react'
import {render} from 'react-dom'
import Deck, {Plugins} from '@dekk/deck'
import Paging from '@dekk/paging'
import Url from '@dekk/url'
import {FitImage} from '@dekk/image'
import Text, {Title, Subtitle} from '@dekk/text'
import {
  Cover,
  Collage,
} from '@dekk/master-slides'


const App = () => (
  <Deck>
    <Plugins>
      <Paging/>
      <Url/>
    </Plugins>
    <Cover.Slide>
      <Cover.A>
        <Title>Welcome to Dekk!</Title>
      </Cover.A>
      <Cover.B>
        <Subtitle>Presentations done right</Subtitle>
      </Cover.B>
    </Cover.Slide>
    <Collage.Slide>
      <Collage.A>
        <Title>Collage</Title>
        <Text>
          This is a slide with two images and a text section.
        </Text>
      </Collage.A>
        <FitImage 
          src="https://placehold.it/600"
          alt="this is a placeholder image. please adjust the alt accordingly"/>
      <Collage.B>
      </Collage.B>
      <Collage.C>
        <FitImage 
          src="https://placehold.it/600"
          alt="this is a placeholder image. please adjust the alt accordingly"/>
      </Collage.C>
    </Collage.Slide>
    <Cover.Slide>
      <Cover.A>
        <Title>Thank you!</Title>
      </Cover.A>
      <Cover.B>
        <Subtitle>for listening</Subtitle>
      </Cover.B>
    </Cover.Slide>
  </Deck>
)

render(<App/>, document.getElementById('app'))
```

