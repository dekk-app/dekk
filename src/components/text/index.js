import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {text} from './styles.scss'
export {default as Title} from './title'
export {default as Subtitle} from './subtitle'
export {default as Code} from './code'
export {default as Quote} from './quote'
export {default as Center} from './center'
export {default as Bold} from './bold'
export {default as Uppercase} from './uppercase'
export * from './code'

const Text = props => (
  <div {...props} className={classNames(props.className, text)}>
    {props.children}
  </div>
)

export default Text
