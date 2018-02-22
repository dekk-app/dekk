# Elements

To add static elements to your deck you can use the `Elements` component.
It will render any ReactElement aside the slides. You might have to add
additional styling to your `Deck`.


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
