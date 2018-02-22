# Master slides

This section will guide you through the options and explain how master slides work.

## Creating master slides

To create a Slide with the same layout and style you can define a Master slide.

```jsx
import React from 'react'
import createMaster, {Master, Slot} from '@dekk/master'

export default createMaster(
  <Master>
    <Slot name='Content'/>
  </Master>
)
```

## Adding Slots

If you want different sections in your slide you can simply add more slots.

```jsx
import React from 'react'
import createMaster, {Master, Slot} from '@dekk/master'

export default createMaster(
  <Master>
    <Slot name='Left'/>
    <Slot name='Right'/>
  </Master>
)
```

## Content types

A slot can be configured to only allow certain components.
Components can be allowed or forbidden.

```jsx
import React from 'react'
import createMaster, {Master, Slot} from '@dekk/master'
import Image from '@dekk/image'

export default createMaster(
  <Master>
    <Slot name='Left' only={[Image]}/>
    <Slot name='Right' not={[Image]}/>
  </Master>
)
```

## Static Slots

In some cases you might want a slot to always appear without having to add it to every slide.
You can add static slots to allow this feature.

Usecases:
  * Header / Footer
  * Navigation elements / Page number

```jsx
import React from 'react'
import createMaster, {Master, Static, Slot} from '@dekk/master'
import Image from '@dekk/image'

import Footer from './path/to/custom/footer.js'

export default createMaster(
  <Master>
    <Static name="Footer"><Footer/></Static>
    <Slot name='Content'/>
  </Master>
)
```

## Adding Styles

Dekk uses styled-components under the hood.
It is recommended to follow this concept to style your slides.

The example below uses css-grid to create a custom layout.

```jsx
import React from 'react'
import createMaster, {Master, Static, Slot} from '@dekk/master'
import Image from '@dekk/image'
import styled from 'styled-components'

import Footer from './path/to/custom/footer.js'

const MasterSlide = createMaster(
  <Master>
    <Static name="Footer"><Footer/></Static>
    <Slot name='Content'/>
  </Master>
)

export default MasterSlide

export const Slide = styled(MasterSlide)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: calc(100% - 2rem) 2rem;
  grid-template-areas:
    "Content"
    "Footer";

  [data-slot],
  [data-static] {
    height: 100%;
    width: 100%;
  }
  [data-static="Footer"] {
    grid-area: Footer;
  }
  [data-slot="Content"] {
    grid-area: Content;
  }
`
```
