# Slides

A slide defines one page of the deck. You have several options to modify
each slide.


| Param           | Type               | Default       | Description |
|-----------------|--------------------|---------------|-------------|
| `background`    | **`string`**       | none          | A background for this slide |
| `animation`     | **`string,array`** | slide.reverse | An animation to replace the default |
| `animationIn`   | **`string,array`** |               | The same as animation but only when entering |
| `animationOut`  | **`string,array`** |               | The same as animation but only when leaving |
| `mixin`         | **`string,array`** |               | A mixin to extend the slides styles |
| `springOptions` | **`object`**       | presets.stiff | A [react-motion configuration]()https://github.com/chenglou/react-motion#helpers |

```jsx
import React from 'react'
import {css} from 'styled-components'
import Slide from '@dekk/slide'
import Fragment from '@dekk/fragment'


const props = {
  animation: `opactiy: calc(1 - var(--time))`,
  background: 'red',
  mixin: css`padding: 3em;`,
  springSettings: {
      stiffness: 20,
      damping: 10
  }

export default (
  <Slide {...props}>
    This is my slide
  </Slide>
)
```
