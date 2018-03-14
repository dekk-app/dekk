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
  background: #333;
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
        <Slide mixin={mixin} background="hsl(0, 50%, 50%)">
          Press Arrow right
        </Slide>
        <Slide mixin={mixin} background="hsl(60, 50%, 50%)">
          Press Arrow right or left
        </Slide>
        <Slide mixin={mixin} background="hsl(120, 50%, 50%)">
          Press Arrow left
        </Slide>
      </Deck>
    </Wrapper>
  )
}
