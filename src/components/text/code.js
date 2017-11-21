import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {code} from './styles.scss'
export * from 'react-syntax-highlighter/dist/styles'

const Code = props => (
  <SyntaxHighlighter {...props} className={classNames(props.className, code)}/>
)

export default Code
