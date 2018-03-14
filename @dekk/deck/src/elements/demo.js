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
  font-size: 2rem;
  line-height: 3rem;
  background: black;
  color: white;
`

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem;
  line-height: 2rem;
  background: black;
  color: white;
`
const Header = () => <StyledHeader>Dekk Elements</StyledHeader>
const Footer = () => <StyledFooter>Dekk Elements</StyledFooter>

const Wrapper = styled.div`
  position: relative;
  height: 10rem;
`

const mixin = css`
  padding: 3rem 0 2rem;
`
export default function() {
  return (
    <Wrapper>
      <Deck mixin={mixin}>
        <Elements>
          <Header />
          <Footer />
        </Elements>
        <Slide>Slide 1</Slide>
      </Deck>
    </Wrapper>
  )
}
