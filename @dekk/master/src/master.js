import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
import Slide from '@dekk/slide'
import Notes from '@dekk/speaker-notes'
import Warning from './warning'
import {Slot, Static} from './components'

class Master extends Component {
  render() {
    const {children, content, pageIndex, current} = this.props
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

    // Allow page fragments
    const fragments = onlyContent
      .reduce((a, b) => a.concat(b), [])
      .map(x => x.props.children)
      .reduce((a, b) => a.concat(b), [])
      .filter(x => typeof x === 'object' && typeof x.props.fragment === 'number')
      .sort((a, b) => {
        if (a.props.fragment > b.props.fragment) {
          return 1
        } else if (a.props.fragment < b.props.fragment) {
          return -1
        }
        return 0
      })

    const filledSlots = slots
      .map((item, i) => {
        const {only, not, required, component, name} = item.props
        const index = onlyContent.map(child => child.type).indexOf(component)

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
        ).map((child, idx) => {
          if (only) {
            if (only.includes(child.type)) {
              return child
            }
            return (
              <Warning
                {...item.props}
                key={`slot_${idx}`}
                type={
                  (child.type && (child.type.displayName || child.type.name)) ||
                  `"${child}"`
                }
                invalid
              />
            )
          }
          if (not) {
            if (not.includes(child.type)) {
              return (
                <Warning
                  {...item.props}
                  key={`slot_${idx}`}
                  type={
                    (child.type &&
                      (child.type.displayName || child.type.name)) ||
                    `"${child}"`
                  }
                  invalid
                />
              )
            }
            return child
          }
          return child
        })
        if (required && children.length === 0) {
          return (
            <div key={`item__${i}`} data-slot={item.props.name}>
              <Warning {...item.props} missing />
            </div>
          )
        }
        return (
          <div key={`item__${i}`} data-slot={item.props.name}>
            {children}
          </div>
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
  current: PropTypes.bool
}

export default Master
