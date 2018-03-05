# Image elements

Dekk provides some basic iamge elements.

## MaskedImage

A simple image mask. This component renders a mask with a 
`background-image`. The image is scaled to its original size.

You can provide 4 css variables to modify the appearance.


**Default CSS version**

```css
.small-square {
  --width: 300px;
  --height: 300px;
}

.top-right {
  --background-position: top right;
}

.zoom-2 {
  --background-size: 200% auto;
}
```

```jsx
import React from 'react'
import MaskedImage from '@dekk/image'

export default (
  <MaskedImage
    className="small-square top-right zoom-2"
    src="path/to/an/image.jpg"
    alt="this is required ♿️"
    title="titles are optional"
  />
)
```
**Styled components version**

> Wrapping an image inside a styled commponent makes them invalid
> if they were defined in master slots.
> There is no good way to allow or disallow this but maybe the 
> future brings a solution to this issue.  
> To use these components you have to use masters without
`not` or `only` restrictions, create your own master-slides or work
with default slides.

Styled components makes it easy to make several presets that can
be used or shared. 

```jsx
import React from 'react'
import styled, {css} from 'styled-components'
import MaskedImage from '@dekk/image'

export const smallSquare = css`
  --width: 300px;
  --height: 300px;
`

export const topRight = css`
  --background-position: top right;
`

export const zoom2 = css`
  --background-size: 200% auto;
`
export 
const SmallImage = styled(MaskedImage)`
  ${smallSquare};
`

export const ZoomImage = styled(MaskedImage)`
  ${zoom2};
  ${topRight};  
`
```

## FitImage

A version of MaskedImage that is already using:

```jsx
css`
  --height: 100%;
  --width: 100%;
`
```

This component is required
for `@dekk/master-slides~Collage`,
`@dekk/master-slides~Half`
and `@dekk/master-slides~ImageGrid`