import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getImage = this.getImage.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
  }

  handleLoad() {
    this.setState({
      loaded: true,
      height: this.image.height,
      width: this.image.width
    })
  }

  get style() {
    return {
      backgroundImage: `url("${this.props.src}")`,
      '--height': `${this.state.height}px`,
      '--width': `${this.state.width}px`
    }
  }

  getImage(el) {
    this.image = el
  }

  render() {
    return (
      <Mask style={this.style}>
        <Img ref={this.getImage}
             src={this.props.src}
             alt={this.props.alt}
             title={this.props.title}
             onLoad={this.handleLoad}/>
      </Mask>
    )
  }
}

const Mask = styled.div`
  background-size: cover;
  width: var(--width);
  height: var(--height);
`
const Img = styled.img`
  ${props => props.loaded ? 'display: none;' : ''}
`

Image.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string
}

export default Image
