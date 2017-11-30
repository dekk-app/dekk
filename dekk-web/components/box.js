import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './itemtypes'
import styles from './styles.scss'


const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (dropResult) {
      props.onDrop(props, dropResult)
    }
  },
}

function collect (connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
  }
}


class Box extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isDragging, connectDragSource } = this.props
    const { name } = this.props

    return connectDragSource(<div className={styles.box}>
      {name}
    </div>)
  }
}

Box.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}


export default DragSource(props => props.type, boxSource, collect)(Box)
