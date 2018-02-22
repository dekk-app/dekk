import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Motion, spring} from 'react-motion'

import StyledFragment from './fragment'

/**
 * Class for fragment.
 * @public
 *
 * @class Fragment
 * @param {Object} props
 *   The properties
 * @param {(ReactElement|ReactElement[])} props.children
 * @param {number} props.order
 * @param {?Boolean} props.root
 * @param {Object} context
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
   * @return {{store: store, fragmentHost: number, hostedFragmentOrder: number}}
   */
  static get contextTypes() {
    return {
      store: PropTypes.object.isRequired,
      fragmentHost: PropTypes.number,
      hostedFragmentOrder: PropTypes.number
    }
  }

  /**
   * Sends context to decendants. Includes the app store to allow all deck
   * components to access the store without having to include its own logic.
   * @private
   *
   * @return {{hostedFragmentOrder: number}}
   */
  static get childContextTypes() {
    return {
      hostedFragmentOrder: PropTypes.number
    }
  }

  /**
   * Constructor
   * @public
   * @param {Object}                  props
   *   The properties
   * @param {(ReactNode|ReactNode[])} props.children
   * @param {number}                  props.order
   * @param {?Boolean}                props.root
   * @param {Object}                  context
   *   The context
   */
  constructor(props, context) {
    super(props, context)
  }

  /**
   * Gets the child context.
   * @private
   * @return {{hostedFragmentOrder: number}}
   *   The child context.
   */
  getChildContext() {
    const {hostedFragmentOrder = 0} = this.context
    return {
      hostedFragmentOrder: this.props.root
        ? this.props.order + hostedFragmentOrder
        : hostedFragmentOrder
    }
  }

  /**
   * Before the fragments are mounted we need to tell the application about
   * their existance and behaviour.
   * @private
   */
  componentWillMount() {
    const {order} = this.props
    const {fragmentHost, hostedFragmentOrder = 0} = this.context
    // Get the current host to allow extending it.
    const host =
      this.context.store.fragmentHosts.length - 1 >= fragmentHost
        ? this.context.store.fragmentHosts[fragmentHost]
        : []

    // Handle root components. the root index is added to nested fragments
    // to allow them to be rendered before or after their parent fragment
    const fragmentOrder = order + hostedFragmentOrder

    // Only add new indexes to the queue.
    // Duplicate indexes will appear at the same time.
    // Root components are respected by definition.
    if (host.indexOf(fragmentOrder) < 0) {
      host.push(fragmentOrder)
    }

    // If no fragment has been defined with `0` we need to add a position to
    // our host
    if (host.length > 0 && host.indexOf(0) < 0) {
      host.push(0)
    }
    // Sort the fragment indexes and update the store
    this.context.store.fragmentHosts[fragmentHost] = host.sort((a, b) => a - b)
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
    const {fragmentHost, hostedFragmentOrder = 0, store} = this.context
    // To ensure the correct loading we need to manually attempt to
    // find the correct order. This only happens on slides that have not
    // initially been loaded.
    // @todo the initial Load should handle this correctly.
    const {length: fragmentHostCount = 0} = store.fragmentHosts[fragmentHost]
    const lastFragment = Math.max(0, fragmentHostCount - 1)
    const {
      fragmentOrder: storedFragmentOrder = store.fragmentHosts[fragmentHost][
        Math.min(store.fragmentIndex, lastFragment)
      ]
    } = store

    // Define several flags to determine the acitve state
    // of the fragment.
    const isPrev = fragmentHost < store.slideIndex
    const isNext = fragmentHost > store.slideIndex
    const fragmentOrder = this.props.order + hostedFragmentOrder
    const isZero = fragmentOrder === 0
    const isActivated =
      (store.fragmentOrder || storedFragmentOrder) >= fragmentOrder
    const isActive = isPrev || (isNext ? isZero : isActivated)
    const springStyle = {
      time: spring(isActive ? 0 : 1, {
        ...this.props.springSettings
      })
    }
    return (
      <Motion style={springStyle}>
        {({time}) => {
          const style = {
            '--time': time
          }
          return (
            <StyledFragment
              style={style}
              active={isActive}
              animation={this.props.animation}>
              {this.props.children}
            </StyledFragment>
          )
        }}
      </Motion>
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
