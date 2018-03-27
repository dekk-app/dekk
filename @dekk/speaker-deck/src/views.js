import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @private
 */
const View = styled.div`
  --scale: var(--view-scale, 1);
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: View;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

export default View

export const Iframe = styled.iframe`
  transform-origin: 0 0;
  width: calc(100% / var(--scale, 1));
  height: calc(100% / var(--scale, 1));
  transform: scale(var(--scale, 1));
`

/**
 * @private
 */
export const Preload = styled.div`
  display: none;
`

/**
 * @private
 */
export const Preview = styled.div`
  --scale: var(--preview-scale, 1);
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: Preview;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

/**
 * @private
 */
export const Nextview = styled.div`
  ${({layout}) => (layout === 0 ? '' : 'display: none')};
  --scale: var(--nextview-scale);
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: Nextview;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

/**
 * @private
 */
Nextview.propTypes = {
  layout: PropTypes.number
}

/**
 * @private
 */
Nextview.defaultProps = {
  layout: 0
}
