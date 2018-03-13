---
displayName: "Reference: Basic usage"
description: "A simple overview of Dekk and SpeakerDekk"
tags: 
  - Reference
options:
  order: 1
---


# Creating a Deck

To create a Deck you need two core packages, `Deck` and `Slide`.
A Deck can contain several Components aside `Slide`. Take a look at
[`Plugins`](plugins.html) and [`Elements`](static-elements.html)
to understand how these can be used in your
`Deck`

Decks and Slides only provide the render logic and handle an internal
state. Without plugins you won't be able to navigate through the Deck.
This allows a very unique kind of configauration.
Read more [here](plugins.html)

## Deck

```jsx
import React from 'react'
import Deck from '@dekk/deck'
import Slide from '@dekk/slide'

export default (
  <Deck>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```

## Speaker Deck

There is a speaker/presenter version of Dekk with some extra features.
SpeakerDeck expects a timer to be set. You can also specify a warning time.


| Param          | Type         | Default          | Description |
|----------------|--------------|------------------|-------------|
| `timer`        | **`number`** | (required)       | The time in minutes (30 minutes = 30) |
| `timerWarning` | **`number`** | 0                | The time in seconds (5 minutes = 5 * 60) |


```jsx
import React from 'react'
import SpeakerDeck from '@dekk/speaker-deck'
import Slide from '@dekk/slide'

export default (
  <SpeakerDeck
    timer={30}
    timerWarning={5 * 60}>
    <Slide> 1 </Slide>
    <Slide> 2 </Slide>
    <Slide> 3 </Slide>
  </SpeakerDeck>
)
```
