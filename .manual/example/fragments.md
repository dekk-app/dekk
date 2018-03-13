---
displayName: "Example: Fragments"
description: "Using fragments in slides"
tags: 
  - Example
options:
  order: 12
---

# Using fragments

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
