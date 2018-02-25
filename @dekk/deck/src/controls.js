import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import Icon from '@dekk/icon'
import image from '@dekk/icon/lib/image'

const Controls = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  grid-area: Controls;
  display: grid;
  grid-template-rows: 2rem 2rem auto;
  grid-template-columns: 10rem 1fr repeat(3, 2rem);
  grid-gap: 0.25rem;
  grid-template-areas:
    'PageNumber ControlB PlayButton ThemeToggle LayoutToggle '
    'FragmentNumber . . . .'
    'ControlA ControlA ControlA ControlA ControlA';
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
    <Icon icon={image['view-compact']} />
  </StyledLayoutToggle>
)

const StyledThemeToggle = styled.button`
  grid-area: ThemeToggle;
  ${toggleStyle};
`

export const ThemeToggle = props => {
  const icon = props.isDark ? image['wb-sunny'] : image['brightness-2']
  return (
    <StyledThemeToggle {...props}>
      <Icon icon={icon} />
    </StyledThemeToggle>
  )
}

ThemeToggle.propTypes = {
  isDark: PropTypes.bool
}

ThemeToggle.defaultProps = {
  isDark: false
}

const StyledPlayButton = styled.button`
  grid-area: PlayButton;
  ${toggleStyle};
`

export const PlayButton = props => {
  const icon = props.isPlaying ? image['timer-off'] : image.timer
  return (
    <StyledPlayButton {...props}>
      <Icon icon={icon} />
    </StyledPlayButton>
  )
}

PlayButton.propTypes = {
  isPlaying: PropTypes.bool
}

PlayButton.defaultProps = {
  isPlaying: false
}

export const ControlA = styled.div`
  grid-area: ControlA;
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0.75rem 1rem 1rem;
  box-sizing: border-box;
`

export const ControlB = styled.div`
  grid-area: ControlB;
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
`

export const PageNumber = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  grid-area: PageNumber;
  box-shadow: 0 -1px 0 0 ${({theme}) => (theme === 'dark' ? '#222' : '#ddd')} inset;
`

export const FragmentNumber = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  grid-area: FragmentNumber;
  box-shadow: 0 -1px 0 0 ${({theme}) => (theme === 'dark' ? '#222' : '#ddd')} inset;
`

export const Label = styled.span`
  display: inline-block;
  text-align: right;
  padding-right: 0.5rem;
  width: 6rem;
  min-width: max-content;
`

export const Countdown = styled.div`
  font-size: 2rem;

  [data-warning] {
    color: #a00;
  }
`
