import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @public
 */
const Quote = props => (
  <Figure>
    <BlockQuote className={props.className} cite={props.cite}>
      {props.children}
    </BlockQuote>
    <figcaption>{props.author}</figcaption>
  </Figure>
)

/**
 * @private
 */
const BlockQuote = styled.blockquote`
  margin: 0;
`

/**
 * @private
 */
const Figure = styled.figure`
  margin: 0;
`

/**
 * @private
 */
Quote.propTypes = {
  author: PropTypes.string,
  cite: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

/**
 * @private
 */
Quote.defaultProps = {
  author: '',
  cite: '',
  className: ''
}

/**
 * @private
 */
Quote.displayName = 'Quote'

export default Quote
