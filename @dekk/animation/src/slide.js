import {css} from 'styled-components'

/**
 * A simple slide transition.
 *
 * @public
 * @property {Array} normal
 *   Transition from left to right
 * @property {Array} reverse
 *   Transition from right to left
 * @property {Array} up
 *   Transition upwards
 * @property {Array} down
 *   Transition downwards
 */
const slide = {
  normal: css`
    transform: translate3d(
      calc(
        -100% * var(--direction, -1) * (var(--regulator, 0) - var(--time, 1))
      ),
      0,
      0
    );
  `,
  reverse: css`
    transform: translate3d(
      calc(
        -100% * var(--direction, -1) * (var(--regulator, 0) - var(--time, 1)) *
          -1
      ),
      0,
      0
    );
  `,
  down: css`
    transform: translate3d(
      0,
      calc(
        -100% * var(--direction, -1) * (var(--regulator, 0) - var(--time, 1)) *
          -1
      ),
      0
    );
  `,
  up: css`
    transform: translate3d(
      0,
      calc(
        -100% * var(--direction, -1) * (var(--regulator, 0) - var(--time, 1))
      ),
      0
    );
  `
}

export default slide
