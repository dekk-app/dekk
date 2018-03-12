import {css} from 'styled-components'

/**
 * A collection of layouts
 * @private
 * @type {Object}
 */
const layouts = {
  /**
   * A collection of AB layouts
   * @type {Object}
   */
  AB: {},
  /**
   * A collection of ABC layouts
   * @type {Object}
   */
  ABC: {}
}

export default layouts

/**
 * Basic styles used in layouts
 * @private
 */
export const baseStyles = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 2rem;
`

/**
 * Vertical alignment helpers
 * @private
 * @type {Object}
 */
export const vertical = {}

/**
 * Vertical alignemt using flexbox
 * @private
 */
vertical.base = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`

/**
 * Vertically align top
 * @private
 */
vertical.start = css`
  ${vertical.base} justify-content: flex-start;
`

/**
 * Vertically align bottom
 * @private
 */
vertical.end = css`
  ${vertical.base} justify-content: flex-end;
`

/**
 * Vertically align bottom
 * @private
 */
vertical.center = css`
  ${vertical.base} justify-content: center;
`

/**
 * Base layout
 * @private
 */
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

/**
 * Layout for A
 * @private
 */
layouts.A = css`
  ${layouts.base};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'slotA';
`

/**
 * Layout for AB
 * @private
 */
layouts.AB.topBottom = css`
  ${layouts.base};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotA'
    'slotB';
`

/**
 * Layout for AB
 * @private
 */
layouts.AB.leftRight = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'slotA slotB';
`

/**
 * Layout for ABC
 * @private
 */
layouts.ABC.top = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotA slotA'
    'slotB slotC';
`

/**
 * Layout for ABC
 * @private
 */
layouts.ABC.right = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotB slotA'
    'slotC slotA';
`

/**
 * Layout for ABC
 * @private
 */
layouts.ABC.bottom = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotB slotC'
    'slotA slotA';
`

/**
 * Layout for ABC
 * @private
 */
layouts.ABC.left = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotA slotB'
    'slotA slotC';
`

/**
 * Layout for ABCD
 * @private
 */
layouts.ABCD = css`
  ${layouts.base};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'slotA slotB'
    'slotC slotD';
`
