---
displayName: "Example: Basic"
description: "Basic Dekk usage"
tags: 
  - Example
options:
  order: 12
---

# Basic Example

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
