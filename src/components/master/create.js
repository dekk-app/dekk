import React, {Children, cloneElement} from 'react'
import classNames from 'classnames'
import Master from './master'
import {Slot} from './helpers'

export default function(master) {
  const {children, className} = master.props
  const Component = props => {
    const filledChildren = Children.toArray(children).map((child, i) => {
      if (child.type === Slot) {
        return cloneElement(child, {
          key: `master-slot__${i}`,
          component: Component[child.props.name]
        })
      } else return child
    })
    return (
      <Master {...props}
              className={classNames(props.className, className)}
              content={props.children}
              children={filledChildren}/>
  )}
  Children.toArray(children).filter(child => child.type === Slot).forEach(slot => {
    Component[slot.props.name] = () => null
  })
  return Component
}
