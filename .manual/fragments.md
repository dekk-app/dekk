# Fragments

A slide can have multiple fragments which are activated before the next slide.

| Param           | Type               | Default       | Description |
|-----------------|--------------------|---------------|-------------|
| `order`         | **`number`**       |               | the order of the fragment |
| `root`          | **`boolean`**      | false         | defines if a fragment is considered a RootFragment |
| `fit`           | **`boolean`**      | false         | defines if a fragment is considered a FitFragment |
| `animation`     | **`string,array`** | slide.reverse | An animation to replace the default |
| `mixin`         | **`string,array`** |               | A mixin to extend the fragment styles |
| `displayAs`     | **`string`**       |               | Displays the fragment as ... (CSS box-model display modes, e.g `inline-block`, `block`) |
| `springOptions` | **`object`**       | presets.stiff | A [react-motion configuration]()https://github.com/chenglou/react-motion#helpers |


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

## Fragment order

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

## Nested Fragments

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


## Fragment root

You can use fragment roots to ensure that parent fragments are activated before their children.

**How does it behave under the hood?**  

In a fragment root with the order `4`, a nested fragment with the
order `5` is now handled as `9` (`5 + 4`)

**Resulting order**

```
1               1   ->   1
5 ━━━━━━┳━━━━━━ 5   ->   2
6       ┃       6   ->   3
1   +   5   =   6   ->   3
7       ┃       7   ->   4
4   +   5   =   9   ->   5
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


## Fit fragments.

Since fragments do not provide a box-model any nested fit element
(`height/width: 100%` or `flex: 1`) will simply collapse.
To prevent this behaviour you can set your fragments to `fit`


```jsx
import React from 'react'
import Fragment from '@dekk/fragment'
import {FitImage} from '@dekk/image'

export default (
  <Fragment order={1} fit>
    <FitImage/>
  </Fragment>
)
```