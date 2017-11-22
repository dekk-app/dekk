import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {text} from './styles.scss'

export {default as Title} from './title'
export {default as Subtitle} from './subtitle'
export {default as Code, colorSchemes} from './code'
export {default as Quote} from './quote'
export {default as Center} from './center'
export {default as Bold} from './bold'
export {default as Uppercase} from './uppercase'

const Text = props => (
  <div {...props} className={classNames(props.className, text)}>
    {props.children}
  </div>
)

Text.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Text
