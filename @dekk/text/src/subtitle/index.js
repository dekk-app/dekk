import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @public
 */
const Subtitle = styled.h2`
  margin: 0;
  font-size: var(--subtitle-font-size, 2em);
  font-family: var(
    --subtitle-font-fammily,
    var(--title-font-family, var(--font-family, var(--default-font-family)))
  );
  text-align: center;
`

/**
 * @private
 */
Subtitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * @private
 */
Subtitle.displayName = 'Subtitle'

export default Subtitle
