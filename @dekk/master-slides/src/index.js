import React from 'react'
import {Master, Slot, createStyledMaster as createMaster} from '@dekk/master'
import Text, {Title, Subtitle} from '@dekk/text'
import {FitImage as Image} from '@dekk/image'
import layouts, {vertical} from './layouts'

export {baseStyles} from './layouts'

/**
 * A cover slide
 * @type {Slide}
 */
export const Cover = createMaster(
  <Master>
    <Slot name="A" only={[Title]} />
    <Slot name="B" only={[Subtitle]} />
  </Master>
)`
  ${layouts.AB.topBottom};
  [data-slot='A'] {
    ${vertical.end};
  }
  [data-slot='B'] {
    ${vertical.start};
  }
`

/**
 * A chapter slide
 * @type {Slide}
 */
export const Chapter = createMaster(
  <Master>
    <Slot name="A" only={[Title]} />
    <Slot name="B" only={[Subtitle, Text]} />
  </Master>
)`
  ${layouts.AB.topBottom};
  [data-slot='A'] {
    ${vertical.end};
  }
  [data-slot='B'] {
    ${vertical.start};
  }
`

/**
 * A 50/50 slide. (half image)
 * @type {Slide}
 */
export const Half = createMaster(
  <Master>
    <Slot name="A" only={[Image]} />
    <Slot name="B" not={[Image]} />
  </Master>
)`
  ${layouts.AB.leftRight};
  [data-slot='B'] {
    ${vertical.start};
    box-sizing: border-box;
    padding: 0 2rem;
  }
`

/**
 * A collage slide. (two images)
 * @type {Slide}
 */
export const Collage = createMaster(
  <Master>
    <Slot name="A" not={[Image]} />
    <Slot name="B" only={[Image]} />
    <Slot name="C" only={[Image]} />
  </Master>
)`
  ${layouts.ABC.right};
  [data-slot='A'] {
    ${vertical.start};
    box-sizing: border-box;
    padding: 0 2rem;
  }
`

/**
 * A grid slide (4 slots)
 * @type {Slide}
 */
export const Grid = createMaster(
  <Master>
    <Slot name="A" />
    <Slot name="B" />
    <Slot name="C" />
    <Slot name="D" />
  </Master>
)`
  ${layouts.ABCD};
  [data-slot] {
    box-sizing: border-box;
    padding: 1rem;
  }
`

/**
 * An image gris slide (4 images)
 * @type {Slide}
 */
export const ImageGrid = createMaster(
  <Master>
    <Slot name="A" only={[Image]} />
    <Slot name="B" only={[Image]} />
    <Slot name="C" only={[Image]} />
    <Slot name="D" only={[Image]} />
  </Master>
)`
  ${layouts.ABCD};
`
