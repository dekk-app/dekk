import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import Slide from '../../../slide'
import Deck from './'

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

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Deck>
          <Slide mixin={mixin}>Hello Dekk!</Slide>
        </Deck>
      </Wrapper>
    )
  }
}

export default function() {
  return <App />
}
