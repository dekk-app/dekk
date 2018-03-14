import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import Deck, {Plugins} from '../../deck'
import Slide from '../../slide'
import Paging from './'

const OuterWrapper = styled.div`
  padding-top: 3rem;
`

const Wrapper = styled.div`
  position: relative;
  height: 10rem;
  overflow: visible;
`

const StyledButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0.5rem;
  padding: 0.25rem 0.5rem;
  height: 2rem;
  font-size: 1rem;
  display: flex;
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
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnabled: false
    }
    this.togglePlay = this.togglePlay.bind(this)
  }

  togglePlay() {
    this.setState(prevState => ({
      isEnabled: !prevState.isEnabled
    }))
  }

  render() {
    return (
      <OuterWrapper>
        <StyledButton onClick={this.togglePlay}>
          {this.state.isEnabled ? 'Disable' : 'Enable'}
        </StyledButton>
        <Wrapper>
          <Deck>
            <Plugins>{this.state.isEnabled ? <Paging /> : null}</Plugins>
            {[...new Array(60)].map((x, i) => (
              <Slide
                key={i}
                background={`hsl(${20 * i}, 50%, 50%)`}
                mixin={mixin}>
                Slide {i + 1}
              </Slide>
            ))}
          </Deck>
        </Wrapper>
      </OuterWrapper>
    )
  }
}

export default function() {
  return <App />
}
