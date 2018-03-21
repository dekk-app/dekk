/* global window */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import Deck from '../deck'
import Slide from '../../../slide'
import Plugins from './'

class MyPlugin extends Component {
  constructor(props) {
    super(props)
    this.counter = 0
    this.loop = this.loop.bind(this)
  }

  loop() {
    this.props.doSomething(`Counter: ${this.counter++}`)
    this.props.toSlide(this.counter % 4)
    setTimeout(() => {
      window.requestAnimationFrame(this.loop)
    }, 1000)
  }

  componentDidMount() {
    this.loop()
  }

  render() {
    return null
  }
}

MyPlugin.propTypes = {
  doSomething: PropTypes.func,
  toSlide: PropTypes.func
}

MyPlugin.defaultProps = {
  doSomething: () => null,
  toSlide: () => null
}

const Wrapper = styled.div`
  position: relative;
  height: 10rem;
`

const mixin = css`
  --slide-background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
`

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: 'start'
    }
    this.handleSomething = this.handleSomething.bind(this)
    this.handleRest = this.handleRest.bind(this)
  }

  handleSomething(content) {
    this.setState({content})
  }

  handleRest() {
    this.setState({
      background: `hsl(${~~(Math.random() * 360)}, 50%, 50%)`
    })
  }

  render() {
    return (
      <Wrapper>
        <Deck>
          <Plugins>
            <MyPlugin doSomething={this.handleSomething} />
          </Plugins>
          {[...new Array(4)].map((x, i) => (
            <Slide
              key={i}
              mixin={mixin}
              background={this.state.background}
              onRest={this.handleRest}>
              Slide {i + 1}: {this.state.content}
            </Slide>
          ))}
        </Deck>
      </Wrapper>
    )
  }
}

export default Demo
