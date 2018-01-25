import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Paging from '@dekk/paging'
import {range} from '@dekk/utils'

/**
 * @private
 * A wrapper around the slides.
 * Includes a paging component to allow navigating the slides.
 * `Deck` itself should not be used. Instead you can use `Dekk`
 * which wraps `Deck` in a store provider.
 * Renders 3 slides (previous, current, next) to allow various transitions
 * between slides.
 */
class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: 0
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.page === this.props.page) {
      return
    }
    this.setState({
      direction: this.props.page > newProps.page ? -1 : 1
    })
  }

  /**
   * Filters the `children` by a range of `+-1` around the current slide.
   * Therefore renders a maximum of 3 slides (previous, current, next)
   * This allows various transitions between slides.
   *
   * @return {array} returns an array of max 3 slides
   */
  get slides() {
    const {page, children} = this.props
    const {direction} = this.state
    return Children
      .map(children, (child, i) => {
        // Clone the element and add properties
        return cloneElement(child, {
          pageIndex: i,
          current: page === i,
          previous: page === i + 1,
          next: page === i - 1,
          fromPrevious: page === i && direction === -1,
          fromNext: page === i && direction === 1,
          toPrevious: page === i + 1 && direction === 1,
          toNext: page === i - 1 && direction === -1,
          direction: direction
        })
      })
      // Filter by a range of `+-1`
      .filter((c, i) => range(i, page + 1, page - 1))
  }

  get paging() {
    const {page, children, slave} = this.props
    if (slave) {
      return false
    }
    return (
      <Paging page={page}
              goToPage={()=>{}}
              pages={children.length}
              trigger='keyup'/>
    )
  }

  render() {
    // Inject the paging logic
    // and render the slides
    return (
      <Wrapper>
        {this.paging}
        {this.slides}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`

Deck.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  slave: PropTypes.bool,
  page: PropTypes.number.isRequired
}

export default Deck
