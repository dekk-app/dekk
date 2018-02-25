import {css} from 'styled-components'

/**
 * A sliding fade transition.
 * These transitions are intended to be used for slides.
 * They are based on viewport-units and therefore only look good on
 * full viewport coverage.
 *
 * @public
 * @property {Array} slideX
 *   Cube rotation on the x axis
 * @property {Array} slideY
 *   Cube rotation on the y axis
 * @property {Array} slideInvertX
 *   Inverted cube rotation on the x axis
 * @property {Array} slideInvertY
 *   Inverted cube rotation on the y axis
 */
const cube = {
  slideX: css`
    backface-visibility: hidden;
    transform: perspective(200vw) translate3d(0, 0, -50vw)
      rotate3d(0, 1, 0, calc(90deg * var(--direction, -1) * var(--time, 1)))
      translate3d(0, 0, 50vw);
  `,
  slideY: css`
    backface-visibility: hidden;
    transform: perspective(200vh) translate3d(0, 0, -50vh)
      rotate3d(1, 0, 0, calc(90deg * var(--direction, -1) * var(--time, 1)))
      translate3d(0, 0, 50vh);
  `,
  slideInvertX: css`
    backface-visibility: hidden;
    transform: perspective(200vw) translate3d(0, 0, 50vw)
      rotate3d(0, 1, 0, calc(-90deg * var(--direction, -1) * var(--time, 1)))
      translate3d(0, 0, -50vw);
  `,
  slideInvertY: css`
    backface-visibility: hidden;
    transform: perspective(200vh) translate3d(0, 0, 50vh)
      rotate3d(1, 0, 0, calc(-90deg * var(--direction, -1) * var(--time, 1)))
      translate3d(0, 0, -50vh);
  `
}

export default cube
