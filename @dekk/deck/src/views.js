import PropTypes from 'prop-types'
import styled from 'styled-components'

const View = styled.div`
  --scale: var(--view-scale);
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: View;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

export default View

export const Preload = styled.div`
  display: none;
`

export const Preview = styled.div`
  --scale: var(--preview-scale);
  position: relative;
  height: 100%;
  width: 100%;
  grid-area: Preview;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

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
