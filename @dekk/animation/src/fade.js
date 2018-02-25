import {css} from 'styled-components'

/**
 * A simple slide transition.
 *
 * @public
 * @property {Array} in
 *   Fades in
 * @property {Array} out
 *   Fades out
 */
const fade = {
  in: css`
    opacity: calc(1 - var(--time));
  `,
  out: css`
    opacity: var(--time);
  `
}

export default fade
