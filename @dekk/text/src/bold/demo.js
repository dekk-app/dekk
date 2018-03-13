import React from 'react'
import styled from 'styled-components'
import Bold from './'

const Wrapper = styled.div`
  --highlight-color: #00f;
`
export default function() {
  return (
    <Wrapper>
      Lorem ipsum <Bold>dolor</Bold> sit <Bold highlight>amed</Bold>.
    </Wrapper>
  )
}
