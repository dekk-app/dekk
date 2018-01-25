import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import * as colorSchemes from 'react-syntax-highlighter/dist/styles'

const Code = styled(SyntaxHighlighter)`
  font-size: var(--code-font-size, 1em);
`

Code.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string
}

export {colorSchemes}
export default Code
