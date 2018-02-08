import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Quote = props => (
  <Figure>
    <BlockQuote className={quote} cite={props.cite}>
      {props.children}
    </BlockQuote>
    <figcaption>{props.author}</figcaption>
  </Figure>
)

const BlockQuote = styled.blockquote`
  margin: 0;
`
const Figure = styled.figure`
  margin: 0;
`

Quote.propTypes = {
  cite: PropTypes.string,
  author: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node
}

Quote.displayName = 'Quote'

export default Quote
