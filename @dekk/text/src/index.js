import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export {default as Title} from './title'
export {default as Subtitle} from './subtitle'
export {default as Code, colorSchemes} from './code'
export {default as Quote} from './quote'
export {default as Center} from './center'
export {default as Bold} from './bold'
export {default as Uppercase} from './uppercase'

/**
 * @public
 */
const Text = styled.p`
  padding: 0;
`
/**
 * @private
 */
Text.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * @private
 */
Text.displayName = 'Text'

export default Text
