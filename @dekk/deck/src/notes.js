import React, {Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * A Note provider to help with store based notes
 * @private
 * @param {Object} props
 * @param {(ReactElement|ReactElement[])} props.children
 */
const NoteProvider = ({children}) => (
  <div>
    {Children.toArray(children).map((child, i) =>
      cloneElement(child, {key: i})
    )}
  </div>
)

/**
 * @private
 */
NoteProvider.propTypes = {
  children: PropTypes.node
}

/**
 * @private
 */
NoteProvider.defaultProps = {
  children: null
}

export default NoteProvider

/**
 * A Notes section for the speaker
 * @private
 */
export const Notes = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: Notes;
  background: #fff;
  color: #000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`
