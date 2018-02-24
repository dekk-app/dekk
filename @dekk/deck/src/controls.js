import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const Controls = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  grid-area: Controls;
  display: grid;
  grid-template-rows: 2rem auto;
  grid-template-columns: 3.5rem 3.5rem 1fr 1fr 2rem 2rem 2rem;
  grid-gap: 1rem;
  grid-template-areas:
    'PageNumber FragmentNumber . . PlayButton ThemeToggle LayoutToggle'
    'Control1 Control1 Control1 Control2 Control2 Control2 Control2';
`
export default Controls

const toggleStyle = css`
  background: ${({theme}) => (theme === 'dark' ? '#222' : '#ddd')};
  color: ${({theme}) => (theme === 'dark' ? '#ddd' : '#222')};
  box-shadow: 0 0 0 1px ${({theme}) => (theme === 'dark' ? '#333' : '#ccc')}
    inset;
  border: 0;
  border-radius: 3px;
  height: 2rem;
  width: 2rem;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({theme}) => (theme === 'dark' ? '#333' : '#ccc')};
  }

  &:active {
    background: ${({theme}) => (theme === 'dark' ? '#444' : '#bbb')};
  }

  &:focus {
    outline: 0;
    background: highlight;
  }

  svg {
    height: 1em;
    width: 1em;
  }
`

const StyledLayoutToggle = styled.button`
  grid-area: LayoutToggle;
  ${toggleStyle};
`

export const LayoutToggle = props => (
  <StyledLayoutToggle {...props}>
    <svg viewBox="0 0 24 24">
      <path
        fill="currentcolor"
        d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H11V3M13,3V11H21V5C21,3.89 20.11,3 19,3M13,13V21H19C20.11,21 21,20.11 21,19V13"
      />
    </svg>
  </StyledLayoutToggle>
)

const StyledThemeToggle = styled.button`
  grid-area: ThemeToggle;
  ${toggleStyle};
`

export const ThemeToggle = props => (
  <StyledThemeToggle {...props}>
    <svg viewBox="0 0 24 24">
      <path
        fill="currentcolor"
        d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z"
      />
    </svg>
  </StyledThemeToggle>
)

const StyledPlayButton = styled.button`
  grid-area: PlayButton;
  ${toggleStyle};
`

export const PlayButton = props => {
  const d = props.isPlaying
    ? 'M14,19H18V5H14M6,19H10V5H6V19Z'
    : 'M8,5.14V19.14L19,12.14L8,5.14Z'
  return (
    <StyledPlayButton {...props}>
      <svg viewBox="0 0 24 24">
        <path fill="currentcolor" d={d} />
      </svg>
    </StyledPlayButton>
  )
}

export const ControlA = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: Control1;
  background: #fff;
  color: #000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

export const ControlB = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: Control2;
  background: #fff;
  color: #000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`

export const PageNumber = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  grid-area: PageNumber;
`

export const FragmentNumber = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  grid-area: FragmentNumber;
`
