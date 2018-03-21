---
displayName: "Reference: Using animations"
description: "Learn how to use animations for slides and fragments"
tags: 
  - Reference
options:
  order: 4
---


# Animations

Dekk offers some basic transitions. Some trantions only work on slides
since they use viewport units for perspective or tranlation on the z axis.


## Shared transitions

The transitions in this category work for slides and fragments.

| Name                  | Usage           | Description |
|-----------------------|-----------------|-------------|
| fade in               | slide, fragment | It fades the element in. |
| slide reverse         | slide, fragment | This is the default slide animation. It moves the element from right to center. |
| slide normal          | slide, fragment | It moves the element from left to center. |
| slide up              | slide, fragment | It moves the element from bottom to center. |
| slide down            | slide, fragment | It moves the element from top to center. |


## Slide transitions

The transitions in this category only work for slides.

| Name                | Usage | Description |
|---------------------|-------|-------------|
| cube slideX         | slide | It rotates the cube on the x axis. convex version |
| cube slideY         | slide | It rotates the cube on the y axis. convex version |
| cube slide invert x | slide | It rotates the cube on the x axis. concave version |
| cube slide invert y | slide | It rotates the cube on the y axis. concave version |
| flip x              | slide | It flips the slide on the x axis. |
| flip y              | slide | It flips the slide on the y axis. |

### Demo

```widget
const React = require("react");
const {PatternDemo} = require("@patternplate/widgets");

module.exports = () => <PatternDemo id="animation" />;
```

## Fragment transitions

The transitions in this category only work for fragments.

| Name                  | Usage    | Description |
|-----------------------|----------|-------------|
| fade out              | fragment | It fades the fragment out. |
| fadeSlide out reverse | fragment | It moves the fragment from center to right and fades out. |
| fadeSlide out normal  | fragment | It moves the fragment from center to left and fades out. |
| fadeSlide out up      | fragment | It moves the fragment from center to top and fades out. |
| fadeSlide out down    | fragment | It moves the fragment from center to bottom and fades out. |
| fadeSlide in reverse  | fragment | It moves the fragment from right to center and fades in. |
| fadeSlide in normal   | fragment | It moves the fragment from left to center and fades in. |
| fadeSlide in up       | fragment | It moves the fragment from top to center and fades in. |
| fadeSlide in down     | fragment | It moves the fragment from bottom to center and fades in. |

## Writing transitions

Transitions are very simple css snippets.
You can create your own, using two css variables.

| Name          | Values    | Usage           | Description |
|---------------|-----------|-----------------|-------------|
| `--time`      | 1.0 - 0.0 | slide, fragment | A float from 1 to 0. 0 defines an active state. |
| `--direction` | -1, 0, 1  | slide           | previous is -1, current is 0, next is 1 |


As long as you only use `--time` and work with relaitive values you
can use the transitions for slides and fragments. 

> **Relative values**  
> They can be used for slides and fragments  
> `translateX(var(--time) * 100%)`  
>
> **Viewport values**  
> They can be used for slides and in rare cases for fragments  
> `translateX(var(--time) * 100vw)`  
>
> **Absolute values**  
> They can be used for fragments and in rare cases for slides  
> `translateX(var(--time) * 100px)`


```jsx
import {css} from 'styled-components'
import {fade} from '@dekk/animation'

export const zoom = {}

zoom.in = css`
  --scale: calc(1 - var(--time));
  transform: scale3d(var(--scale, 0), var(--scale, 0), 1);
`

zoom.out = css`
  transform: scale3d(var(--time, 1), var(--time, 1), 1);
`

export const fadeZoom = {}

fadeZoom.in = css`
  ${fade.in};
  ${zoom.in};
`

fadeZoom.out = css`
  ${fade.out};
  ${zoom.out};
`
```