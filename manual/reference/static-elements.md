---
displayName: "Reference: Using Dekk Elements"
description: "A simple overview of Dekk Elements"
tags: 
  - Reference
options:
  order: 6
---

# Elements

To add static elements to your deck you can use the `Elements` component.
It will render any ReactElement aside the slides. You might have to add
additional styling to your `Deck`.

## Demo

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="elements" />;
```

```jsx
import React from 'react'
import Deck, {Elements} from '@dekk/deck'
import Slide from '@dekk/slide'

export default (
  <Deck>
    <Elements>
      {/* load elements here */}
    </Elements>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```

## Setting element data

Data can be set from slides. You can use the Static Helper `Data`
from `Elements`

```jsx
import React from 'react'
import Deck, {Plugins, Elements} from '@dekk/deck'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'

const Header = props => <header>{props.title}</header>
Header.defaultProps = {
  title: 'Hello World!'
}
export default (
  <Deck>
    <Plugins>
      <Paging/>
    </Plugins>
    <Slide>
      <Elements.Data title="Welcome Slide 1"/>
      <span>Slide 1</span>
    </Slide>
    <Slide>
      <Elements.Data title="dynamic data in static elements"/>
      <span>Slide 2</span>
    </Slide>
    <Slide> Sldie 3 </Slide>
  </Deck>
)
```