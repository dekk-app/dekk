import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slide from '@dekk/slide'
import Notes from '@dekk/speaker-notes'
import Fragment, {FragmentRoot} from '@dekk/fragment'
import Warning from './warning'
import {Slot, Static} from './components'

/**
 * Renders a component that displays a warning about an invalid
 * child component.
 * @private
 * @param {ReactComponent} child
 *   Can be any react component
 * @param {number} index
 *   Used to generate the key property
 * @param {Object} itemProps
 *   The original props of the parent
 * @returns {Warning}
 *   An invalid component warning
 */
const invalid = (child, index, itemProps) => (
  <div key={`slot__${index}`} data-slot={name}>
    <Warning
      {...itemProps}
      type={
        (child.type && (child.type.displayName || child.type.name)) ||
        `"${child}"`
      }
      invalid
    />
  </div>
)

/**
 * Renders a component that displays a warning about an invalid
 * child component.
 * @private
 * @param {String} name
 *   Name of the Component
 * @param {number} index
 *   Used to generate the key property
 * @param {Object} itemProps
 *   The original props of the parent
 * @returns {Warning}
 *   A missing component warning
 */
const missing = (name, index, itemProps) => (
  <div key={`slot__${index}`} data-slot={name}>
    <Warning {...itemProps} missing />
  </div>
)

/**
 * Either renders a component defined in the `only` parameter
 * or returns a warning in case the child does not match the accepted
 * types.
 * @private
 * @param {ReactComponent[]} only
 *   A list of ReactComponents that are allowed
 * @param {ReactComponent} child
 *   The child element that is intended to be added
 * @param {number} index
 *   Used to generate the key property
 * @param {Object} itemProps
 *   The original props of the parent
 */
const onlyOrWarning = (only, child, index, itemProps) => {
  // Check if child is allowed
  if (only.includes(child.type)) {
    return child
  }
  // in case the child is a fragment, check all child elements
  if (child.type === Fragment || child.type === FragmentRoot) {
    return cloneElement(child, {
      children: Children.toArray(child.props.children).map(child =>
        onlyOrWarning(only, child)
      )
    })
  }
  return invalid(child, index, itemProps)
}

/**
 * Either renders a component not defined in the `not` parameter
 * or returns a warning in case the child matches the unaccepted
 * types.
 * @private
 * @param {ReactComponent[]} not
 *   A list of ReactComponents that are not allowed
 * @param {ReactComponent} child
 *   The child element that is intended to be added
 * @param {number} index
 *   Used to generate the key property
 * @param {Object} itemProps
 *   The original props of the parent
 */
const notOrWarning = (not, child, index, itemProps) => {
  if (child.type === Fragment || child.type === FragmentRoot) {
    return cloneElement(child, {
      children: Children.toArray(child.props.children).map(child =>
        notOrWarning(only, child)
      )
    })
  }
  if (not.includes(child.type)) {
    return invalid(child, index, itemProps)
  }
  return child
}

/**
 * This component is hte heart of Dekk/master.
 * It will filter different content types and evaluate based on the
 * configuration.
 *
 * Invalid or missing slots are marked with a visual error to allow
 * creating slides on very strict guidelines.
 *
 * **A master can have different use cases:**
 *
 * * resrict layout of slides
 * * render static components by default
 * * predefine a layout/styles
 * * provide an easy API/usage
 *
 * This class should not be used. It is used inside `createMaster`
 * @see {createMaster}
 *
 * @private
 * @param {Object} props
 *   The properties
 * @param {ReactElement,ReactElement[]} props.children
 *   The slots injected by the slide creator (developer/user)
 * @param {ReactElement,ReactElement[]} props.content
 *   The children injected by the createMaster function (internal/private)
 */
class Master extends Component {
  render() {
    const {children, content} = this.props
    // All `Slot` instances
    const slots = Children.toArray(children).filter(
      child => child.type === Slot
    )

    // All `Static` instances
    const statics = Children.toArray(children).filter(
      child => child.type === Static
    )

    // Helper slots are filtered from the children.
    // These slots are allowed and will be ignored.
    // state setters, notes etc should be added here
    const helperSlots = [Notes]

    // Filtered children of the component.
    // Excludes helperSlots
    const onlyContent = Children.toArray(content).filter(
      child => !helperSlots.includes(child.type)
    )

    // Fill all static stols.
    // Adds a wrapping element with a data-attribute.
    const filledStatics = statics.map((item, i) => (
      <div key={`static__${i}`} data-static={item.props.name}>
        {item.props.children}
      </div>
    ))

    const filledSlots = slots
      .map((item, i) => {
        const {only, not, required, component, name} = item.props
        // Get the index of the component inside slot
        const index = onlyContent.map(child => child.type).indexOf(component)
        /**
         * @deprecated
         * @todo Is this still needed?
         * Please describe this and add an example.
         */
        //const Element = item.props.as || 'div'

        // if no component present either return null
        // or a warning if the slot requires a child.
        if (index < 0) {
          return required ? missing(name, i, item.props) : null
        }
        const children = Children.toArray(
          onlyContent[index].props.children
        ).map(
          (child, idx) =>
            // Check for `only` and `not` options
            // If neither is defined simply return the child
            only
              ? onlyOrWarning(only, child, idx, item.props)
              : not ? notOrWarning(only, child, idx, item.props) : child
        )
        // If no children exist in a required slot
        // render a warning about missing content
        if (required && children.length === 0) {
          return missing(name, i, item.props)
        }

        // Return the components wrapped in a slot.
        return (
          <div key={`item__${i}`} data-slot={item.props.name}>
            {children}
          </div>
        )
      })
      // filter to only return valid content
      .filter(x => Boolean(x))

    /**
     * Return a slide with the entire content.
     * @todo add notes to allow rendering them in hte presenter view
     */
    return (
      <Slide {...this.props}>
        {filledStatics}
        {filledSlots}
      </Slide>
    )
  }
}

/**
 * Allowed propTypes for `<Master/>`
 * @private
 * @property {Slot,Static} children
 * @property {ReactElement,ReactElement[]} content
 */
Master.propTypes = {
  children: (props, propName, componentName) => {
    /**
     * An error might be caused and is therefore returned .
     * @todo find a more functional way of doing this.
     */
    let error
    const prop = props[propName]
    Children.forEach(prop, child => {
      if ([Static, Slot].indexOf(child.type) < 0) {
        error = new Error(
          `"Master" only accepts children of type "Slot" or "Static"`
        )
      }
    })
    return error
  },
  content: PropTypes.node
}

export default Master
