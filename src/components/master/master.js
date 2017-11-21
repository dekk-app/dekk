import React, {Component, Children, cloneElement} from 'react'
import {connect} from 'react-redux'
import {omit} from 'lodash'
import PubNubReact from 'pubnub-react'
import classNames from 'classnames'
import Draggable from 'react-draggable'
import Slide from '../slide'
import Notes from '../notes'
import {Slot, Static} from './helpers'
import Warning from './warning'
import {setElementOffset} from '../../actions'
import styles from './styles.scss'
import {LIVE, PRESENT, EDIT} from '../../helpers/query-params'

class Master extends Component {

  constructor(props) {
    super(props)
    if (typeof props.pubnub === 'object' && (LIVE || PRESENT)) {
      this.pubnub = new PubNubReact({
        publishKey: props.pubnub.publishKey,
        subscribeKey: props.pubnub.subscribeKey
      });
      this.pubnub.init(this)
    }
  }

  componentWillMount() {
    if (this.pubnub && LIVE) {
      this.pubnub.subscribe({
        channels: ['slots'],
        withPresence: true
      })

      this.pubnub.getMessage('slots', (msg) => {
        const {offset, name} = msg.message
        this.props.setElementOffset(offset, name)
      })
    }
  }

  componentWillUnmount() {
    if (this.pubnub && LIVE) {
      this.pubnub.unsubscribe({
        channels: ['slots']
      })
    }
  }

  componentWillReceiveProps(newProps) {}

  handleStop(name, e, data) {
    const offset = {x: data.x, y: data.y}
    this.props.setElementOffset(offset, name)
    if (this.pubnub && PRESENT) {
      this.pubnub.publish({
        message: {name, offset},
        channel: 'slots'
      })
    }
  }

  handleDrag(name, e, data) {
    const offset = {x: data.x, y: data.y}
    this.props.setElementOffset(offset, name)
    if (this.pubnub && PRESENT) {
      this.pubnub.publish({
        message: {name, offset},
        channel: 'slots'
      })
    }
  }

  render() {
    // All `Slot` instances
    const slots = Children.toArray(this.props.children)
      .filter(child => child.type === Slot)

    const slotsProps = slots.map(child => child.props)

    // All `Static` instances
    const statics = Children.toArray(this.props.children)
      .filter(child => child.type === Static)

    // Helper slots are filtered from the children.
    const helperSlots = [Notes]

    // Filtered children of the component.
    // Excludes helperSlots
    const content = Children.toArray(this.props.content)
      .filter(child => !(helperSlots.includes(child.type)))

    const filledStatics = statics.map((item, i) => (
      <div key={`static__${i}`}
           data-static={item.props.name}>
        {item.props.children}
      </div>
    ))

    const filledSlots = slots.map((item, i) => {
      const {only, not, required, component, name} = item.props
      const index = content.map((child) => child.type).indexOf(component)
      if (index < 0) {
        if (required) {
          return (
            <div key={`slot__${i}`} data-slot={name} className={styles.missing}>
              <Warning missing={true} {...item.props}/>
            </div>
          )
        }
        return null
      } else {
        const children = Children.toArray(content[index].props.children)
          .map((child, idx) => {
            const {pageIndex, direction} = this.props
            const slotId = `${pageIndex}.${i}.${idx}`
            const draggableOptions = {
              position: this.props.offset[slotId],
              onStop: this.handleStop.bind(this, slotId),
              onDrag: this.handleDrag.bind(this, slotId),
              children: child
            }
            if (only) {
              if (only.includes(child.type)) {
                return EDIT ? (
                  <Draggable key={`slot_${idx}`}
                             {...draggableOptions}/>
                ) : child
              }
              return (
                <Warning key={`slot_${idx}`}
                         invalid={true}
                         type={child.type && child.type.name || `"${child}"`}
                         {...item.props}/>
              )
            }
            if (not) {
              if (not.includes(child.type)) {
                return (
                  <Warning key={`slot_${idx}`}
                           invalid={true}
                           type={child.type && child.type.name || `"${child}"`}
                           {...item.props}/>
                )
              }
              return EDIT ? (
                <Draggable key={`slot_${idx}`}
                           {...draggableOptions}/>
              ) : child
            }
            return EDIT ? (
              <Draggable key={`slot_${idx}`}
                         {...draggableOptions}/>
            ) : child
          })
        if (required && children.length === 0) {
          return (
            <div  key={`item__${i}`} data-slot={item.props.name} className={styles.missing}>
              <Warning missing={true} {...item.props}/>
            </div>
          )
        }
        return (
          <div key={`item__${i}`}
               data-slot={item.props.name}>
            {children}
          </div>
        )
      }
    }).filter(x => Boolean(x))

    const notes = PRESENT ? (
      <div className={styles.notes}>
          {Children.toArray(this.props.content).filter(child => (child.type === Notes))}
      </div>
    ) : null

    return (
      <Slide {...this.props}>
        {filledStatics}
        {filledSlots}
        {notes}
      </Slide>
    )
  }
}

export default connect(state => {
  return {
    page: state.goToPage.page,
    offset: state.setElementOffset.offset
  }
}, {setElementOffset})(Master)
