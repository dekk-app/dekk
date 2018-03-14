import React from 'react'
import styled from 'styled-components'
import Deck from '../deck'
import Slide from '../../../slide'
import Plugins from './'

const MyPlugin = props => {
  console.info('[Look at the console] > MyPlugin called')
  return null
}

const Wrapper = styled.div`
  position: relative;
  height: 10rem;
`

export default function() {
  return (
    <Wrapper>
      <Deck>
        <Plugins>
          <MyPlugin />
        </Plugins>
        <Slide>Look at the console</Slide>
      </Deck>
    </Wrapper>
  )
}
