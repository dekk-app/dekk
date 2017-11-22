import React, {Component, Children} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import PubNubReact from 'pubnub-react'
import Draggable from 'react-draggable'
import {LIVE, PRESENT, EDIT} from '../../helpers/query-params'
import {setElementOffset} from '../../actions'
import Slide from '../slide'
import Notes from '../notes'
import Warning from './warning'
import {Slot, Static} from './helpers'
import styles from './styles.scss'

class Master extends Component {
  constructor(props) {
    super(props)
    if (typeof props.pubnub === 'object' && (LIVE || PRESENT)) {
      this.pubnub = new PubNubReact({
        publishKey: props.pubnub.publishKey,
        subscribeKey: props.pubnub.subscribeKey
      })
      this.pubnub.init(this)
    }
  }

  componentWillMount() {
    if (this.pubnub && LIVE) {
      this.pubnub.subscribe({
        channels: ['slots'],
        withPresence: true
      })

      this.pubnub.getMessage('slots', msg => {
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
      const index = content.map(child => child.type).indexOf(component)
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
      const children = Children.toArray(content[index].props.children)
        .map((child, idx) => {
          const {pageIndex} = this.props
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

Master.propTypes = {
  children: PropTypes.oneOfType([PropTypes.instanceOf(Slot), PropTypes.instanceOf(Static)]),
  content: PropTypes.node,
  pubnub: PropTypes.shape({
    publishKey: PropTypes.string,
    subscribeKey: PropTypes.string
  }),
  pageIndex: PropTypes.number,
  setElementOffset: PropTypes.func,
  offset: PropTypes.object
}

export default connect(state => {
  return {
    page: state.goToPage.page,
    offset: state.setElementOffset.offset
  }
}, {setElementOffset})(Master)
