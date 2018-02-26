import {css} from 'styled-components'

const layouts = {
  AB: {},
  ABC: {}
}

export default layouts

export const baseStyles = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 2rem;
`

export const vertical = {}
vertical.base = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`

vertical.start = css`
  ${vertical.base} justify-content: flex-start;
`

vertical.end = css`
  ${vertical.base} justify-content: flex-end;
`

layouts.base = css`
  ${baseStyles};
  display: grid;

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
  grid-template-areas: 'slotA';
`

layouts.AB.topBottom = css`
  ${layouts.base};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotA'
    'slotB';
`

layouts.AB.leftRight = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'slotA slotB';
`

layouts.ABC.top = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotA slotA'
    'slotB slotC';
`

layouts.ABC.right = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotB slotA'
    'slotC slotA';
`

layouts.ABC.bottom = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotB slotC'
    'slotA slotA';
`

layouts.ABC.left = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotA slotB'
    'slotA slotC';
`

layouts.ABCD = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotA slotB'
    'slotC slotD';
`
