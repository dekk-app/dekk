import React, {Component} from 'react'
import {omit} from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.scss'

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleLoad() {
    this.setState({
      loaded: true,
      height: this.image.height,
      width: this.image.width,
    })
  }

  get style() {
    return {
      backgroundImage: `url("${this.props.src}")`,
      '--height': `${this.state.height}px`,
      '--width': `${this.state.width}px`
    }
  }

  get imageClasses() {
    return classNames(styles.image, {
      [styles.loaded]: this.state.loaded
    })
  }

  getImage(el) {
    this.image = el
  }

  render() {
    return (
      <div {...omit(this.props, ['alt', 'title', 'src'])}
           style={this.style}
           className={classNames(this.props.className, styles.mask)}>
        <img ref={this.getImage.bind(this)}
             className={this.imageClasses}
             src={this.props.src}
             alt={this.props.alt}
             title={this.props.title}
             onLoad={this.handleLoad.bind(this)}/>
      </div>
      )
  }
}

export default Image
