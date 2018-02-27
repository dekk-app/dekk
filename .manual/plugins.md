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
const handleFragment = (slideIndex, slideCount, fragmentIndex, fragmentOrder, fragmentCount) => {
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

## Writing plugins

Dekk will allow any plugin that is nested inside `Plugins`.
It fills the plugin with some properties before it is enabled.
This will allow you to interact with your `Deck`.

### Simple broadcast plugin

```jsx
<Broadcast credentials={MY_SECRET}/>
```

```jsx
import {Component} from 'react'
import PropTypes from 'prop-types'

const sendData (data) => {
  // do something with the data
}

export default class Broadcast extends Component {
  componentWillReceiveProps({slideIndex, credentials}) {
    if (this.props.slideIndex !== slideIndex) {
      // Let's send some data when the slide changes
      sendData({slideIndex, credentials})
    }
  }

  render() {
    return null
  }
}
```

### Simple autoplay plugin

```jsx
<Autoplay delay={120} isPlaying={true}/>
```

```jsx
import {Component} from 'react'
import PropTypes from 'prop-types'

export default class Autoplay extends Component {
  componentDidMount() {
    this.play()
  }

  play() {
    const {
      fragmentCount,
      fragmentIndex,
      slideCount,
      slideIndex,
      toNextFragment,
      toNextSlide,
      isPlaying
    } = this props
    const fragments = Math.max(0, fragmentCount - 1)
    const slides = Math.max(0, slideCount - 1)
    if (isPlaying) {
      setTimeout(() => {
        if (fragments > fragmentIndex) {
          toNextFragment()
        } if (slides > slideIndex) {
          toNextSlide()
        }
        requestAnimationFrame(this.play.bind(this))
      }, 1000 * this.props.delay)
    }
  }

  render() {
    return null
  }
}
```

### Full API usage.

Take a look at one of the plugins, provided by Dekk to get a better
understanding of all the possibilities.

* [Listener](../file/@dekk/listener/src/index.js.html)
* [Paging](../file/@dekk/paging/src/index.js.html)
* [Url](../file/@dekk/url/src/index.js.html)

Dekk will fill your Plugin with the following properties.

| Name                | Type                     | Description|
|---------------------|--------------------------|------------|
| `slideCount`        | **`number`**   | The total number of slides in the Deck. |
| `slideIndex`        | **`number`**   | The index of the currently active slide. |
| `fragmentCount`     | **`number`**   | The total number of slides in the currently active slide. |
| `fragmentIndex`     | **`number`**   | The index of the currently active fragment in the currently active slide. |
| `fragmentOrder`     | **`number`**   | The order of the currently active fragment in the currently active slide. This is the value including all fragment root orders if there are any. |
| `toFragment(index)` | **`function`** | This function will allow you to navigate to a fragment. The index must be in range of `fragmentCount`. |
| `toSlide(index)`    | **`function`** | This function will allow you to navigate to a slide. The index must be in range of `slideCount`. |
| `toNextFragment()`  | **`function`** | This function will allow you to navigate to the next fragment. The index must be in range of `slideCount`. |
| `toPrevFragment()`  | **`function`** | This function will allow you to navigate to the previous fragment. |
| `toNextSlide()`     | **`function`** | This function will allow you to navigate to the next slide. |
| `toPrevSlide()`     | **`function`** | This function will allow you to navigate to the previous slide. |
