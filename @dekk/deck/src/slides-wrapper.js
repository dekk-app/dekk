import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * A wrapper around the slides.
 * This will help with the layout e.g. adding
 * padding to Deck and therefore allowing absolute posiitoned
 * static elements via the `Elements` component.
 * @private
 */
const SlidesWrapper = styled.div`
  flex: 1 0 100%;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`

/**
 * Allowed propTypes for `<SlidesWrapper/>`
 * @private
 * @param {Array<Deck.visibleSlides>} children
 * @type {Object}
 */
SlidesWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
}

export default SlidesWrapper
