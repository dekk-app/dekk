# Plugins

To configure your Deck you can use the Plugins component. This allows you
to choose the type of URLs Dekk writes or add listeners as well as enable
paging


```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'

export default (
  <Deck>
    <Plugins>
      {/* load plugins here */}
    </Plugins>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```

## Adding listeners

* handleSlide: function
* handleFragment: function
 
```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Listener from '@dekk/listener'

const handleSlide = (slideIndex, slideCount) => {
  // code
}
const handleFragment = (slideIndex, slideCount, fragmentIndex, fragmentOrder, fragmentCOunt) => {
  // code
} 

export default (
  <Deck>
    <Plugins>
      <Listener onSlide={handleSlide}
                onFragment={handleFragment}/>
    </Plugins>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```

## Adding URLs

* type: string: `hash|query`
  * default: `hash`
 

```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Url from '@dekk/url'

export default (
  <Deck>
    <Plugins>
      <Url type="query"/>
    </Plugins>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```

## Enable paging

* trigger: string: `keyup|keydown`
  * default: `keyup`

```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'

export default (
  <Deck>
    <Plugins>
      <Paging trigger="keydown"/>
    </Plugins>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```

