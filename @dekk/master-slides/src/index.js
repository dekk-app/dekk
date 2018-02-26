import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import createMaster, {Master, Slot} from '@dekk/master'
import Text, {Title, Subtitle} from '@dekk/text'
import MaskedImage from '@dekk/image'

import layouts, {vertical} from './layouts'
export {baseStyles} from './layouts'

export const Cover = createMaster(
  <Master>
    <Slot name="A" only={[Title]} />
    <Slot name="B" only={[Subtitle]} />
  </Master>
)

Cover.Slide = styled(Cover)`
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
)

Chapter.Slide = styled(Chapter)`
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
    <Slot name="A" only={[MaskedImage]} />
    <Slot name="B" not={[MaskedImage]} />
  </Master>
)

Half.Slide = styled(Half)`
  ${layouts.AB.leftRight};
  [data-slot='B'] {
    ${vertical.start};
    box-sizing: border-box;
    padding: 0 2rem;
  }
`

export const Collage = createMaster(
  <Master>
    <Slot name="A" not={[MaskedImage]} />
    <Slot name="B" only={[MaskedImage]} />
    <Slot name="C" only={[MaskedImage]} />
  </Master>
)

Collage.Slide = styled(Collage)`
  ${layouts.ABC.right};
  [data-slot='A'] {
    ${vertical.start};
    box-sizing: border-box;
    padding: 0 2rem;
  }
`
