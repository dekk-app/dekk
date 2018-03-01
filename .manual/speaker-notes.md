# Notes


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->



<!-- /code_chunk_output -->

You can add as many notes in your slides as you want.
They will be displayed in order. Notes are filtered from the slides,
they are available in the speaker deck.

```jsx
import React from 'react'
import Deck from '@dekk/deck'
import Slide from '@dekk/slide'
import Notes from '@dekk/speaker-notes'

export default (
  <Deck>
    <Slide> 
      <h1>Slide 1</h1> 
      <Notes>
        <h3>Say something cool</h3>
        <p>Something really cool</p>
      </Notes>
    </Slide>
    <Slide>
      <h1>Slide 2</h1> 
      <Notes><h3>Say something cool</h3></Notes>
      <h2>With notes all over</h2> 
      <Notes>Mention notes</Notes>
    </Slide>
    <Slide> 3 </Slide>
  </Deck>
)
```