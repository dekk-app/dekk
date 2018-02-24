import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const NoteProvider = ({notes}) => (
  <div>
    {Children.toArray(notes).map((note, i) => cloneElement(note, {key: i}))}
  </div>
)

export default NoteProvider

export const Notes = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  grid-area: Notes;
  background: #fff;
  color: #000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  overflow: hidden;
`
