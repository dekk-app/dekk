import {css} from 'styled-components'

/**
 * A collection of layouts for the speaker-deck
 * @private
 */
const layouts = [
  css`
    --view-scale: calc(1 / 3 * 2);
    --preview-scale: calc(1 / 3);
    --nextview-scale: calc(1 / 3);
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      'View Preview'
      'View Controls'
      'Notes Notes';
  `,
  css`
    --view-scale: calc(1 / 3 * 2);
    --preview-scale: calc(1 / 3);
    --nextview-scale: calc(1 / 3);
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      'View Controls'
      'View Preview'
      'Notes Notes';
  `,
  css`
    --view-scale: calc(1 / 3 * 2);
    --preview-scale: calc(1 / 3);
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      'Preview View'
      'Controls View'
      'Notes Notes';
  `,
  css`
    --view-scale: calc(1 / 3 * 2);
    --preview-scale: calc(1 / 3);
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      'Controls View'
      'Preview View'
      'Notes Notes';
  `
]

export default layouts
