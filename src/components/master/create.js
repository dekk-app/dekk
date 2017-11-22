import React, {Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Master from './master'
import {Slot} from './helpers'

export default function (master) {
  const {children, className} = master.props
  const Component = props => {
    return (
      <Master {...props}
              className={classNames(props.className, className)}
              content={props.children}>
        {
          Children.toArray(children).map((child, i) => {
            if (child.type === Slot) {
              return cloneElement(child, {
                key: `master-slot__${i}`,
                component: Component[child.props.name]
              })
            }
            return child
          })
        }
      </Master>
    )
  }

  Children.toArray(children).filter(child => child.type === Slot).forEach(slot => {
    Component[slot.props.name] = () => null
  })

  Component.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  return Component
}
