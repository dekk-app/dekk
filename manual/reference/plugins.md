---
displayName: "Reference: Using and creating Plugins"
description: "Describes included plugins and explains how to write custom plugins"
tags: 
  - Reference
options:
  order: 5
---


# Plugins

To configure your Deck you can use the Plugins component. This allows you
to choose the type of URLs Dekk writes or add listeners as well as enable
paging

## Demo

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="plugins" />;
```

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

## Setting plugin data

Data can be set from slides. You can use the Static Helper `Data`
from `Plugins`

```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Paging from '@dekk/paging'

const MyPlugin = props => {
  console.log(props.foobar) // baz, qux, undefined
}
export default (
  <Deck>
    <Plugins>
      <Paging/>
      <MyPlugin />
    </Plugins>
    <Slide>
      <Plugins.Data foobar="baz"/>
      <span>Slide 1</span>
    </Slide>
    <Slide>
      <Plugins.Data foobar="qux"/>
      <span>Slide 2</span>
    </Slide>
    <Slide> Slide 3 </Slide>
  </Deck>
)
```

## Paging

This plugin enables paging via the arrow keys of your keyboard.

> It is enabled in the preconfigured version of Deck (`@dekk/dekk`)

| Param     | Type         | Default | Description |
|-----------|--------------|---------|-------------|
| `trigger` | **`String`** | keyup   | The event that triggers navigation can be either `keyup` or `keydown`|


## Demo

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="paging" />;
```


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


## Url

This plugin enables URLs via hashes or search queries.

> It is enabled in the preconfigured version of Deck (`@dekk/dekk`)

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

## LocalStorage

This plugin allows you to control a deck from a speaker view. You don't 
need to run a server for this to work. This will also work without a 
network connection.(requires both decks to be opened in the same browser instance.)

> It is enabled in the preconfigured version of Deck (`@dekk/dekk`)

| Param          | Type          | Default    | Description |
|----------------|---------------|------------|-------------|
| `channel`      | **`string`**  | "@dekk"    | The localStorage key used for sending and receiving messages |
| `publish`      | **`boolean`** | false"     | Defines a publisher |
| `subscribe`    | **`string`**  | false      | Defines a subscriber |


```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import LocalStorage from '@dekk/local-storage'

export default (
  <Deck>
    <Plugins>
      <LocalStorage channel='MY_CHANNEL' subscribe/>
    </Plugins>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```


## Pubnub

This plugin allows you to control a deck from a speaker view. You don't 
need to run a server for this to work. This plugin requires a 
network connection.

Requires a [pubnub](https://www.pubnub.com/) keyset with "Storage & Playback" enabled

| Param          | Type          | Default    | Description |
|----------------|---------------|------------|-------------|
| `subscribeKey` | **`string`**  | (required) | Your pubnub subscribeKey |
| `publishKey`   | **`string`**  | (required) | Your pubnub publishKey |
| `channel`      | **`string`**  | "@dekk"    | The pubnub channel used for sending and receivig messages |
| `publish`      | **`boolean`** | false     | Defines a publisher |
| `subscribe`    | **`string`**  | false      | Defines a subscriber |

```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'
import Pubnub from '@dekk/pubnub'

const creds = {
  subscribeKey: 'sub-123456789',
  publishKey: 'pub-123456789'
}

export default (
  <Deck>
    <Plugins>
      <Pubnub {...creds} channel='MY_CHANNEL' subscribe/>
    </Plugins>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```


## Autoplay

This plugin enables autoplay in your Deck.

> Might conflict with the behaviour of `Paging`

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

## Demo

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="autoplay" />;
```


## Listener

This plugin allows you to listen to basic events. It allows you to
do various things without having to write your own plugin.

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


## Writing plugins

Dekk will allow any plugin that is nested inside `Plugins`.
It fills the plugin with some properties before it is enabled.
This will allow you to interact with your `Deck`.

### Simple broadcast plugin

While this could be built using `Listener` it is recommended to build
separate plugins for every use case.

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

### Sharing Plugins

If you create a set of Plugins you can share it with others

**navigation.js**

```jsx
import {Plugins} from '@dekk/dekk'
import Paging from '@dekk/paging'
import Url from '@dekk/url'
import Pubnub from '@dekk/pubnub'

export const plugins = [
  <Paging key="Paging"/>,
  <Url key="Url"/>
]

export default => (
  <Plugins>{plugins}</Plugins>
)
```

### Using shared plugins 

Since you can have multiple `Plugins` instances in your Deck, you can
add the entire collection including the wrapper aside your slides.

```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'

import navigation from './path/to/navigation.js'

export default (
  <Deck>
    {navigation}
    {/* more plugin collections */}
    <Plugins>
      {/* more plugins */}
    </Plugins>

    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```

If you want to keep one instance of `Plugins` you can also add the plugin
collection without the wrapper.

```jsx
import React from 'react'
import Deck, {Plugins} from '@dekk/deck'
import Slide from '@dekk/slide'

import {plugins as navigation} from './path/to/navigation.js'

export default (
  <Deck>
    <Plugins>
      {navigation}
      {/* more plugins */}
    </Plugins>

    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
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
