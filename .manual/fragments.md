# Fragments


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Fragment order](#fragment-order)
* [Nested Fragments](#nested-fragments)
* [Fragment root](#fragment-root)

<!-- /code_chunk_output -->

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
