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

  getChildContext() {
    return {
      hostedFragment: this.props.host ? this.props.fragment : 0
    }
  }

  componentWillMount() {
    const {fragment, host} = this.props
    const {fragmentHost, store, hostedFragment = 0} = this.context
    const localHost = store.fragmentHosts[fragmentHost] || []
    const calculatedFragment = fragment + hostedFragment
    if (localHost.indexOf(calculatedFragment) < 0) {
      localHost.push(calculatedFragment)
    }
    if (localHost.length && localHost.indexOf(0) < 0) {
      localHost.push(0)
    }
    store.fragmentHosts[fragmentHost] = localHost.sort((a, b) => a - b)
  }
  get length() {
    return this.context.store.fragmentHosts[this.context.fragmentHost].length
  }
  render() {
    const {fragment, children, animation} = this.props
    const {fragmentHost, store, hostedFragment = 0} = this.context
    const previous = fragmentHost < store.page
    const next = fragmentHost > store.page
    const calculatedFragment = fragment + hostedFragment
    const active = previous
      ? true
      : next ? calculatedFragment === 0 : store.fragment >= calculatedFragment
    return (
      <StyledFragment active={active} animation={animation}>
        {children}
      </StyledFragment>
    )
  }
}

Fragment.contextTypes = {
  store: PropTypes.object.isRequired,
  fragmentHost: PropTypes.number,
  hostedFragment: PropTypes.number
}

Fragment.childContextTypes = {
  hostedFragment: PropTypes.number
}

export default Fragment
