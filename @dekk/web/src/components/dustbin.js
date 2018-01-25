import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {DropTarget} from 'react-dnd'
import ItemTypes from './itemtypes'
import styles from './styles.scss'

const boxTarget = {
  drop(props, monitor) {
    return {name: props.name}
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class Dustbin extends Component {
  render() {
    const {canDrop, isOver, connectDropTarget} = this.props
    const isActive = canDrop && isOver
    const classes = classNames(this.props.className, {
      [styles.isActive]: isActive,
      [styles.isOver]: isOver,
      [styles.canDrop]: canDrop
    })

    return connectDropTarget(
      <div className={classes}>{this.props.children}</div>
    )
  }
}

Dustbin.propTypes = {
  accepts: PropTypes.arrayOf(PropTypes.string),
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

export default DropTarget(props => props.accepts, boxTarget, collect)(Dustbin)
