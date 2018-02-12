# Usage

## Creating a Deck

To create a Deck you need two core packages, "Deck" and "Slide".

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

## Page fragments

A slide can have multiple fragments which are activated before the next slide.

```jsx
import React from 'react'
import Slide from '@dekk/slide'
import Fragment from '@dekk/fragment'

export default (
  <Slide>
    <Fragment order={1}> 1 </Fragment>
    <Fragment order={2}> 2 </Fragment>
    <Fragment order={3}> 3 </Fragment>
  </Slide>
)
```

### Fragment order

Each fragment order adds a step to the slide, while multiple fragments can appear at once.
The order is used to sort the fragments. 

> Pro Tip: You can create blocks of 20 to make changes easier.

```jsx
import React from 'react'
import Slide from '@dekk/slide'
import Fragment from '@dekk/fragment'

export default (
  <Slide>
    <Fragment order={21}> 2 </Fragment>
    <Fragment order={22}> 3 </Fragment>
    <Fragment order={23}> 4 </Fragment>
    <Fragment order={24}> 5 </Fragment>
    {/* It's easy to extend this list */)}
    <Fragment order={41}> 6 </Fragment>
    {/* Items can appear at the same time */)}
    <Fragment order={42}> 7 </Fragment>
    <Fragment order={42}> 7 </Fragment>
    {/* This is the first fragment */)}
    <Fragment order={1}> 1 </Fragment>
    {/* This fragment is already active */)}
    <Fragment order={0}> 0 </Fragment>
  </Slide>
)
```

### Nested Fragments

Fragments can be nested in each other.

> Pro Tip: A nested fragment can be activated before its parent.
> This allows very complex behavior

```jsx
import React from 'react'
import Slide from '@dekk/slide'
import Fragment from '@dekk/fragment'

export default (
  <Slide>
    <Fragment order={1}> 1 </Fragment>
    {/* The next 2 fragments are activated in order 2, 3 (parent, child) */}
    <Fragment order={2}> 2
      <Fragment order={3}> 3 </Fragment>
    </Fragment>
    {/* The next 2 fragments are activated in order 4, 5 (child, parent) */}
    <Fragment order={5}> 5
      <Fragment order={4}> 4 </Fragment>
    </Fragment>
  </Slide>
)
```


### Fragment root

You can use fragment roots to ensure that parent fragments are activated before their children.

**How does it behave under the hood?**  

Take a fragment root with the order `4`.
A nested fragment with the order `5` is now handled as `9`

**Example below in detail**

* 1: The first fragment to be activated
* 6: The third fragment to be activated (with 5 -> 1)
* 7: The fourth fragment to be activated
* root 5: The second fragment to be activated
  * 1 (6): The third fragment to be activated (with 6)
  * 4 (9): The last fragment to be activated
    4 + 5(root) = 9

**Resulting order**

```
1       1 -> 1
5 ╸╸┓   5 -> 2
6   ╻   6 -> 3
1 + 5 = 6 -> 3
7   ╹   7 -> 4
4 + 5 = 9 -> 5
```

**Code**

```jsx
import React from 'react'
import Slide from '@dekk/slide'
import Fragment from '@dekk/fragment'

export default (
  <Slide>
    <Fragment order={1}> 1 </Fragment>
    {/* The next 2 fragments are activated in order 6, 7 (child, parent)
      * The parent is activated at the same time as the first child of the next
      * fragment block (5 + 1 = 6) is activated.
      * The parent and child are activated before the last child of the next
      * fragment block (5 + 4 = 9) is activated.
      */}
    <Fragment order={7}> 7
      <Fragment order={6}> 6 </Fragment>
    </Fragment>
    {/* The next 2 fragments are activated in order 5, 1, 4 (parent, child, child) */}
    <Fragment order={5} root> 5
      <Fragment order={1}> 1 + 5 = 6 </Fragment>
      {/* This fragment is last in the list */}
      <Fragment order={4}> 4 + 5 = 9 </Fragment>
    </Fragment>
  </Slide>
)
```

## Master slides
This section will guide you through the options and explain how master slides work.

### Creating master slides

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

### Adding Slots

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

### Content types

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

### Static Slots

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

### Adding Styles

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
