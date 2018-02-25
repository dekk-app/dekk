import {css} from 'styled-components'
import slide from './slide'
import fade from './fade'

/**
 * A sliding fade transition.
 *
 * @public
 * @property {Array} in
 *   Fades in
 * @property {Array} in.normal
 *   Transition from left to right
 * @property {Array} in.reverse
 *   Transition from right to left
 * @property {Array} in.up
 *   Transition upwards
 * @property {Array} in.down
 *   Transition downwards
 * @property {Array} out
 *   Fades out
 * @property {Array} out.normal
 *   Transition from left to right
 * @property {Array} out.reverse
 *   Transition from right to left
 * @property {Array} out.up
 *   Transition upwards
 * @property {Array} out.down
 *   Transition downwards
 */
const fadeSlide = {
  in: {
    normal: css`
      --direction: 1;
      --regulator: 0;
      ${fade.in};
      ${slide.normal};
    `,
    reverse: css`
      --direction: 1;
      --regulator: 0;
      ${fade.in};
      ${slide.reverse};
    `,
    up: css`
      ${fade.in};
      ${slide.up};
    `,
    down: css`
      ${fade.in};
      ${slide.down};
    `
  },
  out: {
    normal: css`
      --direction: 1;
      --regulator: 1;
      ${fade.out};
      ${slide.normal};
    `,
    reverse: css`
      --direction: 1;
      --regulator: 1;
      ${fade.out};
      ${slide.reverse};
    `,
    up: css`
      --direction: -1;
      --regulator: 1;
      ${fade.out};
      ${slide.up};
    `,
    down: css`
      --direction: -1;
      --regulator: 1;
      ${fade.out};
      ${slide.down};
    `
  }
}

export default fadeSlide
