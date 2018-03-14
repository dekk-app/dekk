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
