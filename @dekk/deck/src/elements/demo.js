import React from 'react'
import styled, {css} from 'styled-components'
import Deck from '../deck'
import Slide from '../../../slide'
import Elements from './'

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3rem;
  padding: 0 1rem;
  font-size: 2rem;
  line-height: 3rem;
  background: #aa0;
  color: black;
`

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem;
  padding: 0 1rem;
  line-height: 2rem;
  background: #aa0;
  color: black;
`
const Header = () => <StyledHeader>Dekk Elements</StyledHeader>
const Footer = () => <StyledFooter>Dekk Elements</StyledFooter>

const Wrapper = styled.div`
  position: relative;
  height: 20rem;
`

const mixin = css`
  --slide-background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
`

const dekkMixin = css`
  padding: 3rem 0 2rem;
`
export default function() {
  return (
    <Wrapper>
      <Deck mixin={dekkMixin}>
        <Elements>
          <Header />
          <Footer />
        </Elements>
        <Slide mixin={mixin}>Slide 1</Slide>
      </Deck>
    </Wrapper>
  )
}
