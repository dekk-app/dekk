import React from 'react'
import styled, {css} from 'styled-components'
import Deck, {Plugins} from '../../deck'
import Slide from '../../slide'
import Paging from './'

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

export default function() {
  return (
    <Wrapper>
      <Deck>
        <Plugins>
          <Paging />
        </Plugins>
        <Slide mixin={mixin}>Press Arrow Right</Slide>
        <Slide mixin={mixin}>Press Arrow Left or Right</Slide>
        <Slide mixin={mixin}>Press Arrow Left</Slide>
      </Deck>
    </Wrapper>
  )
}
