import React from 'react'
import styled, {css} from 'styled-components'
import createMaster, {Master, Slot} from '@dekk/master'
import Text, {Title, Subtitle, Uppercase} from '@dekk/text'
import Image from '@dekk/image'

const layouts = {
  AB: {},
  ABC: {}
}

export const baseStyles = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 2rem;
`

layouts.base = css`
  ${baseStyles};
  display: grid;
  [data-slot],
  [data-static] {
    height: 100%;
    width: 100%;
  }
  [data-slot='A'] {
    grid-area: slotA;
  }
  [data-slot='B'] {
    grid-area: slotB;
  }
  [data-slot='C'] {
    grid-area: slotC;
  }
  [data-slot='D'] {
    grid-area: slotD;
  }
`

layouts.A = css`
  ${layouts.base};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  grid-template-areas: 'slotA';
`

layouts.AB.topBottom = css`
  ${layouts.base};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  grid-template-areas:
    'slotA'
    'slotB';
`

layouts.AB.leftRight = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  grid-template-areas: 'slotA slotB';
`

layouts.ABC.top = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  grid-template-areas:
    'slotA slotA'
    'slotB slotC';
`

layouts.ABC.right = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  grid-template-areas:
    'slotB slotA'
    'slotC slotA';
`

layouts.ABC.bottom = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  grid-template-areas:
    'slotB slotC'
    'slotA slotA';
`

layouts.ABC.left = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  grid-template-areas:
    'slotA slotB'
    'slotA slotC';
`

layouts.ABCD = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  grid-template-areas:
    'slotA slotB'
    'slotC slotD';
`

export const Cover = createMaster(
  <Master>
    <Slot name="A" only={[Title]} />
    <Slot name="B" only={[Subtitle]} />
  </Master>
)

export const CoverSlide = styled(Cover)`
  ${layouts.AB.topBottom};
  [data-slot='A'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: flex-end;
  }
  [data-slot='B'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
  }
`

export const {A: CoverTop, B: CoverBottom} = Cover

export const Chapter = createMaster(
  <Master>
    <Slot name="A" only={[Title]} />
    <Slot name="B" only={[Subtitle, Text]} />
  </Master>
)

export const ChapterSlide = styled(Chapter)`
  ${layouts.AB.topBottom};
  [data-slot='A'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: flex-end;
  }
  [data-slot='B'] {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
  }
`
export const {A: ChapterTop, B: ChapterBottom} = Chapter

export const Half = createMaster(
  <Master>
    <Slot name="A" only={[Image]} />
    <Slot name="B" not={[Image]} />
  </Master>
)

export const HalfSlide = styled(Half)`
  ${layouts.AB.leftRight};
`
export const {A: HalfLeft, B: HalfRight} = Half

export const Collage = createMaster(
  <Master>
    <Slot name="A" not={[Image]} />
    <Slot name="B" only={[Image]} />
    <Slot name="C" only={[Image]} />
  </Master>
)

export const CollageSlide = styled(Collage)`
  ${layouts.ABC.right};
  [data-slot='A'] {
    box-sizing: border-box;
    padding: 1em 2em;
  }
`
export const {A: CollageRight, B: CollageTop, C: CollageBottom} = Collage
