---
displayName: "Example: Transitions"
description: "Using transitions in slides"
tags: 
  - Example
options:
  order: 12
---

# Changing the transitions 

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
