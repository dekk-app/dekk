import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import StyledFragment from './fragment'

/**
 * Class for fragment.
 * @public
 *
 * @class Fragment @reactProps {Object} props
 *   The properties
 * @reactProps {(ReactElement|ReactElement[])} props.children
 * @reactProps {number} props.order
 * @reactProps {?Boolean} props.root
 * @reactProps {Object} context
 *   The context
 */
export default class Fragment extends Component {
  /**
   * @private
   * @return {{children: (ReactElement|ReactElement[]), animation: ?(String|Array), order: ?number}}
   *   Allowed propTypes for `<Fragment/>`
   */
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired,
      animation: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      order: PropTypes.number.isRequired
    }
  }

  /**
   * Get contextTypes
   * @private
   *
   * @return {{store: store, fragmentHost: number, hostedFragment: number}}
   */
  static get contextTypes() {
    return {
      store: PropTypes.object.isRequired,
      fragmentHost: PropTypes.number,
      hostedFragment: PropTypes.number
    }
  }

  /**
   * Sends context to decendants. Includes the app store to allow all deck
   * components to access the store without having to include its own logic.
   * @private
   *
   * @return {{hostedFragment: number}}
   */
  static get childContextTypes() {
    return {
      hostedFragment: PropTypes.number
    }
  }

  /**
   * Constructor
   * @private
   * @property {Object}                  props
   *   The properties
   * @property {(ReactNode|ReactNode[])} props.children
   * @property {number}                  props.order
   * @property {?Boolean}                props.root
   * @property {Object}                  context
   *   The context
   */
  constructor(props, context) {
    super(props, context)
  }

  /**
   * Gets the child context.
   * @private
   * @return {{hostedFragment: number}}
   *   The child context.
   */
  getChildContext() {
    return {
      hostedFragment: this.props.root ? this.props.order : 0
    }
  }

  /**
   * Before the fragments are mounted we need to tell the application about
   * their exitsance and behavior.
   * @private
   */
  componentWillMount() {
    const {order} = this.props
    const {fragmentHost, store, hostedFragment = 0} = this.context
    // Get the current host to allow extending it.
    const host = store.fragmentHosts[fragmentHost] || []

    // Handle root components. the root index is added to nested fragments
    // to allow them to be rendered before or after their parent fragment
    const fragmentOrder = order + hostedFragment

    // Only add new indexes to the queue.
    // Duplicate indexes will appear at the same time.
    // Root components are respected by definition.
    if (host.indexOf(fragmentOrder) < 0) {
      host.push(fragmentOrder)
    }

    // If no fragment has been defined with `0` we need to add a position to
    // our host
    if (host.length && host.indexOf(0) < 0) {
      host.push(0)
    }
    // Sort the fragment indexes and update the store
    store.fragmentHosts[fragmentHost] = host.sort((a, b) => a - b)
  }

  /**
   * @private
   * @return {number}
   *   The number of fragment indexes (steps to next slide)
   */
  get length() {
    return this.context.store.fragmentHosts[this.context.fragmentHost].length
  }

  /**
   * @private
   * @return {StyledFragment}
   *   The fragment including the entire logic
   */
  render() {
    const {order, children, animation} = this.props
    const {fragmentHost, store, hostedFragment = 0} = this.context
    // Define several flags to determine the acitve state
    // of the fragment.
    const isPrevious = fragmentHost < store.page
    const isNext = fragmentHost > store.page
    const fragmentOrder = order + hostedFragment
    const isZero = fragmentOrder === 0
    const isActivated = store.fragment >= fragmentOrder
    const isActive = isPrevious || (isNext ? isZero : isActivated)
    return (
      <StyledFragment active={isActive} animation={animation}>
        {children}
      </StyledFragment>
    )
  }
}

/**
 * Fragment root component. When using the fragmentRoot, nested Fragments start
 * after the parent. This is a curry version of Fragment.
 * @see    Fragment
 * @public
 * @class  FragmentRoot
 * @reactProps {Object} props
 * @reactProps {(ReactElement|ReactElement[])} props.children
 * @reactProps {number} props.order
 * @return {Fragment}
 *   A Fragment component as root
 */
export const FragmentRoot = props => <Fragment {...props} root />
