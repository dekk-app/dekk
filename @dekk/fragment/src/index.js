import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledFragment = styled.span`
  ${props =>
    props.animation
      ? props.animation(props)
      : `opacity: ${props.active ? 1 : 0};`};
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
    if (this.props.renderAs) {
      this.Component = StyledFragment.withComponent(this.props.renderAs)
    } else {
      this.Component = StyledFragment
    }
  }
  get length() {
    return this.context.store.fragmentHosts[this.context.fragmentHost].length
  }
  render() {
    const previous = this.context.fragmentHost < this.context.store.page
    const next = this.context.fragmentHost > this.context.store.page
    const active = previous
      ? true
      : next
        ? this.props.fragment === 0
        : this.context.store.fragment >= this.props.fragment
    return (
      <this.Component active={active} animation={this.props.animation}>
        {this.props.children}
      </this.Component>
    )
  }
}

Fragment.contextTypes = {
  store: PropTypes.object.isRequired,
  fragmentHost: PropTypes.number
}

export default Fragment
