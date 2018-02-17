import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import * as colorSchemes from 'react-syntax-highlighter/styles/hljs'

/**
 * @private
 */
const RawCode = props => {
  return (
    <SyntaxHighlighter
      className={props.className}
      language={props.language}
      style={props.style}>
      {props.children}
    </SyntaxHighlighter>
  )
}

/**
 * @bublic
 */
const Code = styled(RawCode)`
  font-size: var(--code-font-size, 1em);
`

/**
 * @private
 */
Code.propTypes = {
  style: PropTypes.object,
  language: PropTypes.string,
  className: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string
}

/**
 * @private
 */
Code.displayName = 'Code'

export {colorSchemes}
export default Code
