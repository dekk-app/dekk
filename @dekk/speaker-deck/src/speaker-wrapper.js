import PropTypes from 'prop-types'
import styled from 'styled-components'
import layouts from './layouts'

/**
 * A wrapper around the slides in speaker view.
 * This will help with the layout e.g. adding
 * padding to Deck and therefore allowing absolute posiitoned
 * static elements via the `Elements` component.
 * @private
 */
const SpeakerWrapper = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  ${({layout}) => {
    if (typeof layout === 'number') {
      return `
      display: grid;
      box-sizing: border-box;
      grid-gap: 1rem;
      padding: 1rem;
      ${layouts[layout]}
      `
    }
  }};
`

/**
 * Allowed propTypes for `<SpeakerWrapper/>`
 * @private
 * @param {Array<Deck.visibleSlides>} children
 * @type {Object}
 */
SpeakerWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default SpeakerWrapper
