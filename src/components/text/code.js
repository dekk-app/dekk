import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SyntaxHighlighter from 'react-syntax-highlighter'
import * as colorSchemes from 'react-syntax-highlighter/dist/styles'
import {code} from './styles.scss'

const Code = props => (
  <SyntaxHighlighter {...props} className={classNames(props.className, code)}/>
)

Code.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string
}

export {colorSchemes}
export default Code
