import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * @public
 */
const Quote = props => (
  <Figure>
    <BlockQuote className={props.quote} cite={props.cite}>
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
  cite: PropTypes.string,
  author: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node
}

/**
 * @private
 */
Quote.displayName = 'Quote'

export default Quote
