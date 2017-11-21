import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {figure, quote, caption} from './styles.scss'

const Quote = props => (
  <figure {...props} className={classNames(props.className, figure)}>
    <blockquote className={quote}
                cite={props.cite}>
      {props.children}
    </blockquote>
    <figcaption className={caption}>{props.author}</figcaption>
  </figure>
)

export default Quote
