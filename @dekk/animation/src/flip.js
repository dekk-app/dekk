import {css} from 'styled-components'

/**
 * A simple flip transition.
 * @property {Array} x
 *   Flips on the x axis
 * @property {Array} y
 *   Flips on the y axis
 */
const flip = {
  x: css`
    backface-visibility: hidden;
    transform: perspective(200vw)
      rotate3d(0, 1, 0, calc(180deg * var(--direction, -1) * var(--time, 1)));
  `,
  y: css`
    backface-visibility: hidden;
    transform: perspective(200vh)
      rotate3d(1, 0, 0, calc(180deg * var(--direction, -1) * var(--time, 1)));
  `
}

export default flip
