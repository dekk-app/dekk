import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import Slide from '@dekk/slide'
import Notes from '@dekk/speaker-notes'
import Fragment from '@dekk/fragment'
import Warning from './warning'
import {Slot, Static} from './components'

const invalid = (child, index, itemProps) => (
  <Warning
    {...itemProps}
    key={`slot_${index}`}
    type={
      (child.type && (child.type.displayName || child.type.name)) ||
      `"${child}"`
    }
    invalid
  />
)

const onlyOrWarning = (only, child, index, itemProps) => {
  // Check if child is allowed
  if (only.includes(child.type)) {
    return child
  }
  // in case the child is a fragment, check all child elements
  if (child.type === Fragment) {
    return cloneElement(child, {
      children: Children.toArray(child.props.children).map(child =>
        onlyOrWarning(only, child)
      )
    })
  }
  return invalid(child, index, itemProps)
}

const notOrWarning = (not, child, index, itemProps) => {
  if (child.type === Fragment) {
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

class Master extends Component {
  getChildContext() {
    return {
      fragmentHost: this.props.pageIndex
    }
  }

  render() {
    const {children, content, pageIndex, fragmentIndex, current} = this.props
    // All `Slot` instances
    const slots = Children.toArray(children).filter(
      child => child.type === Slot
    )

    // All `Static` instances
    const statics = Children.toArray(children).filter(
      child => child.type === Static
    )

    // Helper slots are filtered from the children.
    const helperSlots = [Notes]

    // Filtered children of the component.
    // Excludes helperSlots
    const onlyContent = Children.toArray(content).filter(
      child => !helperSlots.includes(child.type)
    )

    const filledStatics = statics.map((item, i) => (
      <div key={`static__${i}`} data-static={item.props.name}>
        {item.props.children}
      </div>
    ))

    const filledSlots = slots
      .map((item, i) => {
        const {only, not, required, component, name} = item.props
        const index = onlyContent.map(child => child.type).indexOf(component)
        const Element = item.props.as || 'div'

        if (index < 0) {
          if (required) {
            return (
              <div key={`slot__${i}`} data-slot={name}>
                <Warning {...item.props} missing />
              </div>
            )
          }
          return null
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
        if (required && children.length === 0) {
          return (
            <Element key={`item__${i}`} data-slot={item.props.name}>
              <Warning {...item.props} missing />
            </Element>
          )
        }
        return (
          <Element key={`item__${i}`} data-slot={item.props.name}>
            {children}
          </Element>
        )
      })
      .filter(x => Boolean(x))

    const title = null

    return (
      <Slide {...this.props}>
        {filledStatics}
        {filledSlots}
        {title}
      </Slide>
    )
  }
}

Master.propTypes = {
  children: (props, propName, componentName) => {
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
  content: PropTypes.node,
  pageIndex: PropTypes.number,
  fragmentIndex: PropTypes.number,
  current: PropTypes.bool
}

Master.contextTypes = {
  store: PropTypes.object.isRequired
}

Master.childContextTypes = {
  fragmentHost: PropTypes.number
}

export default Master
