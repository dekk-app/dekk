# Master slides

Dekk privides a collection of very simple master layouts.

## Usage

There are several ways to use these masters.

The default usage could look something like this:

** deck.js**

```jsx
import React from 'react'
import Cover from '@dekk/master-slides'
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
import {
  Slide,
  A,
  B
} from '@dekk/master-slides'
import {Title, Subtitle} from '@dekk/text'

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
import {
  Slide as Cover,
  A as Top,
  B as Bottom
} from '@dekk/master-slides'
import {Title, Subtitle} from '@dekk/text'

export default (
  <Cover key={uuid()}>
    <Top>
      <Title>Welcome Dekk!</Title>
    </Top>
    <Bottom>
      <Subtitle>Presentations done right</Subtitle>
    </Bottom>
  </Cover>
)
```

## Available Layouts

Dekk currently offers the following master layouts: 

### Cover

* A: only `Title`
  * center/bottom
* B: only `Subtitle`
  * center/top

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

* A: only `Title`
  * center/bottom
* B: only `Subtitle` or `Text`
  * center/top

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

* A: only `FitImage`
  * left/top
* B: not `FitImage`
  * left/top

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

* A: not `FitImage`
  * left/top
* B: only `FitImage`
  * left/top
* C: only `FitImage`
  * left/top

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

* A: any
  * left/top
* B: any
  * left/top
* C: any
  * left/top
* D: any
  * left/top

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

* A: only `FitImage`
  * left/top
* B: only `FitImage`
  * left/top
* C: only `FitImage`
  * left/top
* D: only `FitImage`
  * left/top

```
┏━━━━━━━┳━━━━━━━┓
┃ A     ┃ B     ┃
┃       ┃       ┃
┣━━━━━━━╋━━━━━━━┫
┃ C     ┃ D     ┃
┃       ┃       ┃
┗━━━━━━━┻━━━━━━━┛
```