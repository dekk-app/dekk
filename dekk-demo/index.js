import React from 'react'
import {render} from 'react-dom'

import Deck from '../src'
import Notes from '../src/components/notes'
import SetTitle from '../src/setters/title'
import Text, {
  Subtitle,
  Bold
} from '../src/components/text'
import Title from './elements/title'

import Credits from './masters/credits'

import hero from './assets/hero.jpg'
import red from './assets/red.jpg'

import styles from './styles.scss'

import * as masters from './masters'

const {Red, Green, Blue} = masters

const renderMaster = (master, cb, dark = false) => {
  const m = dark ? master.dark : master
  return cb(m, m.Top, m.Bottom)
}
const slide1 = renderMaster(Blue, (Slide, Top, Bottom) => (
  <Slide className={styles.flip}>
    <SetTitle>Dekk <Bold>preview</Bold><br/>[ALPHA]</SetTitle>
    <Top><Title>Dekk</Title></Top>
    <Bottom><Subtitle>It just works</Subtitle></Bottom>
  </Slide>
))

const App = () => (
  <Deck className={styles.dekk}>

    {slide1}
    <Green/>
    <Blue/>
    <Green>
      <SetTitle>Magic titles</SetTitle>
      <Green.Top>
        <Subtitle>foo</Subtitle>
      </Green.Top>
    </Green>

    <Blue.dark className={styles.fade}>
      <Blue.dark.Top>
        <Title>Dekk</Title>
      </Blue.dark.Top>
      <Blue.dark.Bottom>
        <Subtitle>powered by React.js</Subtitle>
        <Credits>the <Bold>next generation</Bold> presentation tool</Credits>
      </Blue.dark.Bottom>
    </Blue.dark>

  </Deck>
)

const mountPoint = document.getElementById('mountPoint')

render(<App/>, mountPoint)
