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

## Listener

| Param        | Type           | Default | Description |
|--------------|----------------|---------|-------------|
| `onSlide`    | **`Function`** | noop    | A callback when the slide changes |
| `onFragment` | **`Function`** | noop    | A callback when the fragment changes |

```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Listener from '@dekk/listener'

const handleSlide = (
  slideIndex,
  slideCount
) => {
  // code
}
const handleFragment = (
  slideIndex,
  slideCount,
  fragmentIndex,
  fragmentOrder,
  fragmentCount
) => {
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

## Url

| Param  | Type         | Default | Description |
|--------|--------------|---------|-------------|
| `type` | **`String`** | hash    | The URL type can be either `hash` or `query` |


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

## Paging

| Param     | Type         | Default | Description |
|-----------|--------------|---------|-------------|
| `trigger` | **`String`** | keyup   | The event that triggers navigation can be either `keyup` or `keydown`|


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

## Autoplay

| Param       | Type         | Default | Description |
|-------------|--------------|---------|-------------|
| `delay`     | **`number`** | 30      | The number of seconds until the next slide or fragment |
| `isPlaying` | **`number`** | false   | Autoplay can be started or paused via this param |


```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Autoplay from '@dekk/autoplay'

export default (
  <Deck>
    <Plugins>
      <Autoplay delay={60} isPlaying/>
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

### Full API usage.

Take a look at one of the plugins, provided by Dekk to get a better
understanding of all the possibilities.

* [Autoplay](../file/@dekk/autoplay/src/index.js.html)
* [Listener](../file/@dekk/listener/src/index.js.html)
* [Paging](../file/@dekk/paging/src/index.js.html)
* [Url](../file/@dekk/url/src/index.js.html)

Dekk will fill your Plugin with the following properties.

| Name             | Type           | Description|
|------------------|----------------|------------|
| `slideCount`     | **`number`**   | The total number of slides in the Deck. |
| `slideIndex`     | **`number`**   | The index of the currently active slide. |
| `fragmentCount`  | **`number`**   | The total number of slides in the currently active slide. |
| `fragmentIndex`  | **`number`**   | The index of the currently active fragment in the currently active slide. |
| `fragmentOrder`  | **`number`**   | The order of the currently active fragment in the currently active slide. This is the value including all fragment root orders if there are any. |
| `toFragment`     | **`function`** | This function will allow you to navigate to a fragment. The index must be in range of `fragmentCount`. |
| `toSlide`        | **`function`** | This function will allow you to navigate to a slide. The index must be in range of `slideCount`. |
| `toNextFragment` | **`function`** | This function will allow you to navigate to the next fragment. The index must be in range of `slideCount`. |
| `toPrevFragment` | **`function`** | This function will allow you to navigate to the previous fragment. |
| `toNextSlide`    | **`function`** | This function will allow you to navigate to the next slide. |
| `toPrevSlide`    | **`function`** | This function will allow you to navigate to the previous slide. |
