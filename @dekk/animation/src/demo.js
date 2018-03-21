import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import Deck, {Plugins} from '../../deck'
import Slide from '../../slide'
import {fade, slide, flip, cube} from './'

const OuterWrapper = styled.div``

const Wrapper = styled.div`
  position: relative;
  height: 30rem;
  overflow: visible;
`
const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`

const dekkMixin = css`
  background: #000;
`

const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 0.5rem 0.25rem;
  padding: 0.25rem 0.5rem;
  height: 2rem;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  background: #ddd;
  color: #111;
  border: 1px solid #aaa;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    background: #bbb;
    border-color: #888;
  }
`

const mixin = css`
  --slide-background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
`

const Animations = props => {
  const toNextSlide = () => {
    if (props.slideIndex < props.slideCount - 1) {
      props.toNextSlide()
    } else if (props.slideIndex > 0) {
      props.toPrevSlide()
    }
  }
  const flipX = () => {
    props.onClick(flip.x)
    toNextSlide()
  }
  const flipY = () => {
    props.onClick(flip.y)
    toNextSlide()
  }
  const slideNormal = () => {
    props.onClick(slide.normal)
    toNextSlide()
  }
  const slideReverse = () => {
    props.onClick(slide.reverse)
    toNextSlide()
  }
  const cubeSlideX = () => {
    props.onClick(cube.slideX)
    toNextSlide()
  }
  const cubeSlideY = () => {
    props.onClick(cube.slideY)
    toNextSlide()
  }
  const cubeSlideXInvert = () => {
    props.onClick(cube.slideInvertX)
    toNextSlide()
  }
  const cubeSlideYInvert = () => {
    props.onClick(cube.slideInvertY)
    toNextSlide()
  }
  const fadeIn = () => {
    props.onClick(fade.in)
    toNextSlide()
  }
  return (
    <ButtonWrapper>
      <StyledButton onClick={flipX}>Flip x</StyledButton>
      <StyledButton onClick={flipY}>Flip y</StyledButton>
      <StyledButton onClick={slideNormal}>Slide normal</StyledButton>
      <StyledButton onClick={slideReverse}>Slide reverse</StyledButton>
      <StyledButton onClick={cubeSlideX}>Cube Slide x</StyledButton>
      <StyledButton onClick={cubeSlideY}>Cube Slide y</StyledButton>
      <StyledButton onClick={cubeSlideXInvert}>
        Cube Slide x concave
      </StyledButton>
      <StyledButton onClick={cubeSlideYInvert}>
        Cube Slide y concave
      </StyledButton>
      <StyledButton onClick={fadeIn}>FadeIn</StyledButton>
    </ButtonWrapper>
  )
}

Animations.propTypes = {
  onClick: PropTypes.func,
  toNextSlide: PropTypes.func,
  toPrevSlide: PropTypes.func,
  slideCount: PropTypes.number,
  slideIndex: PropTypes.number
}

Animations.defaultProps = {
  onClick: () => null,
  toNextSlide: () => null,
  toPrevSlide: () => null,
  slideCount: 0,
  slideIndex: 0
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(animation) {
    this.setState({animation})
  }

  render() {
    return (
      <OuterWrapper>
        <Wrapper>
          <Deck mixin={dekkMixin}>
            <Plugins>
              <Animations onClick={this.handleClick} />
            </Plugins>
            <Slide
              mixin={mixin}
              animationOut={this.state.animation}
              background="hsl(300, 50%, 50%)">
              Slide 1
            </Slide>
            <Slide
              mixin={mixin}
              animationIn={this.state.animation}
              background="hsl(200, 50%, 50%)">
              Slide 2
            </Slide>
          </Deck>
        </Wrapper>
      </OuterWrapper>
    )
  }
}

export default function() {
  return <App />
}
