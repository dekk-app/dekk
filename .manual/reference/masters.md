---
displayName: "Reference: Creating Master Slides"
description: "How to create your own Master slides"
tags: 
  - Reference
options:
  order: 11
---


# Masters

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

## Adding slots

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

## Static slots

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

## Adding styles

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


## Styled master slides

Dekk provides a styled component wrapper for master slides.

This allows an easier approach at creating master slides.
This is especially helpful when you have worked with styled-components before.

**master.js**

```jsx
import React from 'react'
import {Master, Static, createStyledMaster} from '@dekk/master'
exort default createStyledMaster(
  <Master>
    <Slot name="A"/>
    <Slot name="B"/>
  </Master>
)`
  display: grid;
  grid-template-areas: "A" "B";
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  [data-slot="A"] {
    grid-area: A;
  }
  [data-slot="B"] {
    grid-area: B;
  }
`
```

**deck.js**

`Layout` is a master slide without styling.

It provides statics for `Slide` and all slots that have been defined 
e.g. `{Slot, A, B}` or `{Slot, Top, Bottom}` depending on the names you
assigned.

```jsx
import React from 'react'
import Deck from '@dekk/deck'
import Layout from './path/to/my/master.js'

export default () => (
  <Deck>
    {/* unstyled master */}
    <Layout>
      <Layout.A>Slot A</Layout.A>
      <Layout.B>Slot B</Layout.B>
    </Layout>
    {/* styled master */}
    <Layout.Slide>
      <Layout.A>Slot A</Layout.A>
      <Layout.B>Slot B</Layout.B>
    </Layout.Slide>
  </Deck>
)
```

or even 

```jsx
import React from 'react'
import Deck from '@dekk/deck'
import {Slide, A, B} from './path/to/my/master.js'

export default () => (
  <Deck>
    <Slide>
      <A>Slot A</A>
      <B>Slot B</B>
    </Slide>
  </Deck>
)
```
