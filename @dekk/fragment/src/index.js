import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledFragment = styled.span`
  display: inline-block;
  white-space: pre-wrap;
  width: inherit;
  ${props =>
    props.animation ||
    `
      opacity: ${props.active ? 1 : 0}
  `};
`

class Fragment extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentWillMount() {
    const {fragment} = this.props
    const {fragmentHost, store} = this.context
    const host = store.fragmentHosts[fragmentHost] || []
    if (host.indexOf(fragment) < 0) {
      host.push(fragment)
    }
    if (host.length && host.indexOf(0) < 0) {
      host.push(0)
    }
    store.fragmentHosts[fragmentHost] = host.sort((a, b) => a - b)
  }
  get length() {
    return this.context.store.fragmentHosts[this.context.fragmentHost].length
  }
  render() {
    const {fragment, children, animation} = this.props
    const {fragmentHost, store} = this.context
    const previous = fragmentHost < store.page
    const next = fragmentHost > store.page
    const active = previous
      ? true
      : next ? fragment === 0 : store.fragment >= fragment
    return (
      <StyledFragment active={active} animation={animation}>
        {children}
      </StyledFragment>
    )
  }
}

Fragment.contextTypes = {
  store: PropTypes.object.isRequired,
  fragmentHost: PropTypes.number
}

export default Fragment
