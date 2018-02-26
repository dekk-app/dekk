import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import {Master, Slot, createStyledMaster as createMaster} from '@dekk/master'
import Text, {Title, Subtitle} from '@dekk/text'
import {FitImage as Image} from '@dekk/image'

import layouts, {vertical} from './layouts'
export {baseStyles} from './layouts'

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
