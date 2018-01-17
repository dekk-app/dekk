import React, {Component, Children} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import PubNubReact from 'pubnub-react'
// import Draggable from 'react-draggable'
import {LIVE, PRESENT, EDIT} from '../../helpers/query-params'
import Slide from '../slide'
import Notes from '../notes'
import SetTitle from '../../setters/title'
import Warning from './warning'
import {Slot, Static} from './helpers'
import styles from './styles.scss'


class Master extends Component {
  render() {
    const {children, content, pageIndex, current} = this.props
    // All `Slot` instances
    const slots = Children.toArray(children)
      .filter(child => child.type === Slot)

    // All `Static` instances
    const statics = Children.toArray(children)
      .filter(child => child.type === Static)

    // Helper slots are filtered from the children.
    const helperSlots = [Notes, SetTitle]

    // Filtered children of the component.
    // Excludes helperSlots
    const onlyContent = Children.toArray(content)
      .filter(child => !(helperSlots.includes(child.type)))

    const filledStatics = statics.map((item, i) => (
      <div key={`static__${i}`}
           data-static={item.props.name}>
        {item.props.children}
      </div>
    ))

    const filledSlots = slots.map((item, i) => {
      const {only, not, required, component, name} = item.props
      const index = onlyContent.map(child => child.type).indexOf(component)
      if (index < 0) {
        if (required) {
          return (
            <div key={`slot__${i}`} data-slot={name} className={styles.missing}>
              <Warning {...item.props} missing/>
            </div>
          )
        }
        return null
      }
      const children = Children.toArray(onlyContent[index].props.children)
        .map((child, idx) => {
          const slotId = `${pageIndex}.${i}.${idx}`
          const draggableOptions = {
            children: child
          }
          if (only) {
            if (only.includes(child.type)) {
              return child
            }
            return (
              <Warning {...item.props}
                       key={`slot_${idx}`}
                       type={(child.type && child.type.name) || `"${child}"`}
                       invalid/>
            )
          }
          if (not) {
            if (not.includes(child.type)) {
              return (
                <Warning {...item.props}
                         key={`slot_${idx}`}
                         type={(child.type && child.type.name) || `"${child}"`}
                         invalid/>
              )
            }
            return child
            //return EDIT ? (
            //  <Draggable key={`slot_${idx}`}
            //             {...draggableOptions}/>
            //) : child
          }
          return child
          //return EDIT ? (
          //  <Draggable key={`slot_${idx}`}
          //             {...draggableOptions}/>
          //) : child
        })
      if (required && children.length === 0) {
        return (
          <div key={`item__${i}`} data-slot={item.props.name} className={styles.missing}>
            <Warning {...item.props} missing/>
          </div>
        )
      }
      return (
        <div key={`item__${i}`}
             data-slot={item.props.name}>
          {children}
        </div>
      )
    }).filter(x => Boolean(x))

    const notes = PRESENT ? (
      <div className={styles.notes}>
        {Children.toArray(content).filter(child => (child.type === Notes))}
      </div>
    ) : null

    const title = current ? Children.toArray(content).filter(child => (child.type === SetTitle)) : null

    return (
      <Slide {...this.props}>
        {filledStatics}
        {filledSlots}
        {notes}
        {title}
      </Slide>
    )
  }
}

Master.propTypes = {
  children: (props, propName, componentName) => {
      let error;
      const prop = props[propName];
      Children.forEach(prop, (child) => {
        if ([Static, Slot].indexOf(child.type) < 0) {
          error = new Error(
            `"Master" only accepts children of type "Slot" or "Static"`
          )
        }
      })
      return error;
  },
  content: PropTypes.node,
  pageIndex: PropTypes.number,
  current: PropTypes.bool
}

export default connect(state => {
  return {
    page: state.page
  }
}, {})(Master)
