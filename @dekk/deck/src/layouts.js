import {css} from 'styled-components'

const layouts = [
  css`
    --view-scale: calc(1 / 6 * 4);
    --preview-scale: calc(1 / 6 * 2);
    --nextview-scale: calc(1 / 6 * 2);
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      'Preview Preview Controls Controls Nextview Nextview'
      'Preview Preview Controls Controls Nextview Nextview'
      'View View View View Notes Notes'
      'View View View View Notes Notes'
      'View View View View Notes Notes'
      'View View View View Notes Notes';
  `,
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
