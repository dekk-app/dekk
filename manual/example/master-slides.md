---
displayName: "Example: Master slides"
description: "Using master slides"
tags: 
  - Example
options:
  order: 12
---

# Using master slides

To use master slides you need to add several packages.
This example adds a Deck with 3 slides.
It enables paging and adds url handling.
It uses master slides instead of plain slides.

```jsx
import React from 'react'
import {render} from 'react-dom'
import Deck, {Plugins} from '@dekk/deck'
import Paging from '@dekk/paging'
import Url from '@dekk/url'
import {FitImage} from '@dekk/image'
import Text, {Title, Subtitle} from '@dekk/text'
import {
  Cover,
  Collage,
} from '@dekk/master-slides'


const App = () => (
  <Deck>
    <Plugins>
      <Paging/>
      <Url/>
    </Plugins>
    <Cover.Slide>
      <Cover.A>
        <Title>Welcome to Dekk!</Title>
      </Cover.A>
      <Cover.B>
        <Subtitle>Presentations done right</Subtitle>
      </Cover.B>
    </Cover.Slide>
    <Collage.Slide>
      <Collage.A>
        <Title>Collage</Title>
        <Text>
          This is a slide with two images and a text section.
        </Text>
      </Collage.A>
        <FitImage 
          src="https://placehold.it/600"
          alt="this is a placeholder image. please adjust the alt accordingly"/>
      <Collage.B>
      </Collage.B>
      <Collage.C>
        <FitImage 
          src="https://placehold.it/600"
          alt="this is a placeholder image. please adjust the alt accordingly"/>
      </Collage.C>
    </Collage.Slide>
    <Cover.Slide>
      <Cover.A>
        <Title>Thank you!</Title>
      </Cover.A>
      <Cover.B>
        <Subtitle>for listening</Subtitle>
      </Cover.B>
    </Cover.Slide>
  </Deck>
)

render(<App/>, document.getElementById('app'))
```

