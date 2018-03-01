# Master slides


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Usage](#usage)
* [Available Layouts](#available-layouts)
	* [Cover](#cover)
	* [Chapter](#chapter)
	* [Half](#half)
	* [Collage](#collage)
	* [Grid](#grid)
	* [ImageGrid](#imagegrid)

<!-- /code_chunk_output -->

Dekk privides a collection of very simple master layouts.

## Usage

There are several ways to use these masters.

The default usage could look something like this:

** deck.js**

```jsx
import React from 'react'
import {Cover} from '@dekk/master-slides'
import {Title, Subtitle} from '@dekk/text'

export default () => (
  <Deck>
    <Cover.Slide>
      <Cover.A>
        <Title>Welcome Dekk!</Title>
      </Cover.A>
      <Cover.B>
        <Subtitle>Presentations done right</Subtitle>
      </Cover.B>
    </Cover.Slide>
  </Deck>
)
```

It is recommended to have one module/file per slide so you could
deconstruct the import.

** cover-deconstructed.js**

```jsx
import React from 'react'
import uuid from 'uuid/v4'
import {Cover} from '@dekk/master-slides'
import {Title, Subtitle} from '@dekk/text'

const {Slide, A, B} = Cover

export default (
  <Slide key={uuid()}>
    <A>
      <Title>Welcome Dekk!</Title>
    </A>
    <B>
      <Subtitle>Presentations done right</Subtitle>
    </B>
  </Slide>
)
```

Too add some naming sugar, you can rename your deconstructed Components.

** cover-named-deconstructed.js**

```jsx
import React from 'react'
import uuid from 'uuid/v4'
import {Cover} from '@dekk/master-slides'
import {Title, Subtitle} from '@dekk/text'

const {Slide, A: Top, B: Bottom} = Cover

export default (
  <Slide key={uuid()}>
    <Top>
      <Title>Welcome Dekk!</Title>
    </Top>
    <Bottom>
      <Subtitle>Presentations done right</Subtitle>
    </Bottom>
  </Slide>
)
```

## Available Layouts

Dekk currently offers the following master layouts: 

### Cover

| Slot | Content        | Alignment      |
|------|----------------|----------------|
| A    | only: Title    | center, bottom |
| B    | only: Subtitle | center, bottom |

```
┏━━━━━━━━━━━━━━━┓
┃               ┃
┃       A       ┃
┣━━━━━━━━━━━━━━━┫
┃       B       ┃
┃               ┃
┗━━━━━━━━━━━━━━━┛
```

### Chapter

| Slot | Content              | Alignment      |
|------|----------------------|----------------|
| A    | only: Title          | center, bottom |
| B    | only: Subtitle, Text | center, bottom |

```
┏━━━━━━━━━━━━━━━┓
┃               ┃
┃       A       ┃
┣━━━━━━━━━━━━━━━┫
┃       B       ┃
┃               ┃
┗━━━━━━━━━━━━━━━┛
```

### Half

| Slot | Content        | Alignment |
|------|----------------|-----------|
| A    | only: FitImage | top, left |
| B    | not: FitImage  | top, left |

```
┏━━━━━━━┳━━━━━━━┓
┃ A     ┃ B     ┃
┃       ┃       ┃
┃       ┃       ┃
┃       ┃       ┃
┃       ┃       ┃
┗━━━━━━━┻━━━━━━━┛
```

### Collage

| Slot | Content        | Alignment |
|------|----------------|-----------|
| A    | not: FitImage  | top, left |
| B    | only: FitImage | top, left |
| C    | only: FitImage | top, left |

```
┏━━━━━━━┳━━━━━━━┓
┃ B     ┃ A     ┃
┃       ┃       ┃
┣━━━━━━━┫       ┃
┃ C     ┃       ┃
┃       ┃       ┃
┗━━━━━━━┻━━━━━━━┛
```

### Grid

| Slot | Content  | Alignment |
|------|----------|-----------|
| A    | Any      | top, left |
| B    | Any      | top, left |
| C    | Any      | top, left |
| D    | Any      | top, left |

```
┏━━━━━━━┳━━━━━━━┓
┃ A     ┃ B     ┃
┃       ┃       ┃
┣━━━━━━━╋━━━━━━━┫
┃ C     ┃ D     ┃
┃       ┃       ┃
┗━━━━━━━┻━━━━━━━┛
```

### ImageGrid

| Slot | Content        | Alignment |
|------|----------------|-----------|
| A    | only: FitImage | top, left |
| B    | only: FitImage | top, left |
| C    | only: FitImage | top, left |
| D    | only: FitImage | top, left |

```
┏━━━━━━━┳━━━━━━━┓
┃ A     ┃ B     ┃
┃       ┃       ┃
┣━━━━━━━╋━━━━━━━┫
┃ C     ┃ D     ┃
┃       ┃       ┃
┗━━━━━━━┻━━━━━━━┛
```