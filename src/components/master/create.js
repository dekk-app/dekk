import React, {Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Master from './master'
import {Slot} from './helpers'

export default function (master) {
  const {children, className} = master.props
  const Slide = props => {
    return (
      <Master {...props}
              className={classNames(props.className, className)}
              content={props.children}>
        {
          Children.toArray(children).map((child, i) => {
            if (child.type === Slot) {
              return cloneElement(child, {
                key: `master-slot__${i}`,
                component: Slide[child.props.name]
              })
            }
            return child
          })
        }
      </Master>
    )
  }

  Children.toArray(children).filter(child => child.type === Slot).forEach(slot => {
    const {name} = slot.props
    Slide[name] = new Function(`return function ${name}(props){return null}`)()
  })

  Slide.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  }

  return Slide
}
