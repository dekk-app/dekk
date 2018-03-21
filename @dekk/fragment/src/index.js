import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Motion, spring, presets} from 'react-motion'

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
   */
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
        .isRequired,
      mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      animation: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      root: PropTypes.bool,
      plain: PropTypes.bool,
      fit: PropTypes.bool,
      order: PropTypes.number.isRequired,
      displayAs: PropTypes.string,
      springSettings: PropTypes.shape({
        stiffness: PropTypes.number,
        damping: PropTypes.number,
        precision: PropTypes.number
      })
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      animation: '',
      mixin: '',
      displayAs: undefined,
      fit: false,
      root: false,
      host: false,
      springSettings: presets.stiff
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
      isPreview: PropTypes.bool,
      fragmentOrder: PropTypes.number,
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

  constructor(props, context) {
    super(props, context)
    this.renderChildren = this.renderChildren.bind(this)
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

  renderChildren(time, isActive) {
    if (typeof this.props.children === 'function') {
      return this.props.children(time, isActive)
    }
    return this.props.children
  }

  /**
   * @private
   * @return {StyledFragment}
   *   The fragment including the entire logic
   */
  render() {
    const {
      store,
      fragmentHost,
      fragmentOrder,
      isPreview,
      hostedFragmentOrder = 0
    } = this.context
    // To ensure the correct loading we need to manually attempt to
    // find the correct order. This only happens on slides that have not
    // initially been loaded.
    const {length: fragmentHostCount = 0} = store.fragmentHosts[fragmentHost]
    const lastFragment = Math.max(0, fragmentHostCount - 1)
    const {
      fragmentOrder: storedFragmentOrder = store.fragmentHosts[fragmentHost]
        .length === 0
        ? 0
        : store.fragmentHosts[fragmentHost][
            Math.min(store.fragmentIndex, lastFragment)
          ]
    } = store

    // Define several flags to determine the acitve state
    // of the fragment.
    const isPrev = fragmentHost < store.slideIndex
    const isNext = fragmentHost > store.slideIndex
    const totalFragmentOrder = this.props.order + hostedFragmentOrder
    const isZero = totalFragmentOrder === 0
    const isActivated =
      (fragmentOrder || storedFragmentOrder) >= totalFragmentOrder
    const isActive = isPreview || isPrev || (isNext ? isZero : isActivated)
    const springStyle = {
      t: spring(isActive ? 0 : 1, {
        ...this.props.springSettings
      })
    }
    return (
      <Motion style={springStyle}>
        {({t}) => {
          const time = isActive ? t : 1
          const style = {
            '--time': time
          }
          return this.props.plain ? (
            this.renderChildren(time, isActive)
          ) : (
            <StyledFragment
              style={style}
              isActive={isActive}
              isFit={this.props.fit}
              displayAs={this.props.displayAs}
              mixin={this.props.mixin}
              animation={this.props.animation}>
              {this.renderChildren(time, isActive)}
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
 * @public
 * @param {Object} props
 * @return {Fragment}
 *   A Fragment component as root
 */
export const FragmentRoot = props => <Fragment {...props} root />

/**
 * Fragment plain component. When using the PlainFragment, no wrapping span is used.
 * @public
 * @param {Object} props
 * @return {Fragment}
 *   A Fragment component as plain
 */
export const PlainFragment = props => <Fragment {...props} plain />

/**
 * Fragment fit component. When using the FitFragment, nested elements
 * can use percentage or flex based dimensions.
 * @public
 * @param {Object} props
 * @return {Fragment}
 *   A Fragment component as fit fragment
 */
export const FitFragment = props => <Fragment {...props} fit />
