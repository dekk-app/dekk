import React from 'react'
import {render} from 'react-dom'

import Deck from '../src'
import Notes from '../src/components/notes'
import Text, {
  Title,
  Subtitle,
  Bold
} from '../src/components/text'

import Credits from './masters/credits'

import hero from './assets/hero.jpg'
import red from './assets/red.jpg'

import styles from './styles.scss'

import * as masters from './masters'

const {Red, Green, Blue} = masters
const M = {}
Object.keys(masters).forEach(key => {
  M[key] = fn => fn(masters[key])
  M[key].dark = fn => fn(masters[key].dark)
})

const pubnub = {
  publishKey: 'pub-c-361b8f9d-5d80-44aa-883e-efdf98350d09',
  subscribeKey: 'sub-c-9bee7be6-cac3-11e7-be55-4e84f57698c8'
}

const App = () => (
  <Deck className={styles.dekk}
        pubnub={pubnub}>

    <Red/>
    <Green>
      <Green.Top>
        <Subtitle>foo</Subtitle>
      </Green.Top>
    </Green>

    {(Slide => {
      const {Top, Bottom} = Slide
      return (
        <Slide background={hero}>
          <Top>
            <Title>Dekk</Title>
          </Top>
          <Bottom>
            <Subtitle>powered by React.js</Subtitle>
          </Bottom>
          <Notes>
            <Text>
              These are some <Bold>notes</Bold>.
              <br/>
              This information will help you remember what to say or not to
              forget important information.
            </Text>
          </Notes>
        </Slide>
      )
    })(Blue.dark)}

    {M.Red.dark(Slide => {
      return (
        <Slide background={red}>
          <Slide.Top>
            <Title>Dekk</Title>
          </Slide.Top>
          <Slide.Bottom>
            <Subtitle>powered by React.js</Subtitle>
          </Slide.Bottom>
        </Slide>
      )
    })}

    {M.Green(Slide => {
      const {Top, Bottom} = Slide
      return (
        <Slide className={styles.fade}>
          <Top>
            <Title>Dekk</Title>
          </Top>
          <Bottom>
            <Subtitle>powered by React.js</Subtitle>
            <Credits>the <Bold>next generation</Bold> presentation tool</Credits>
          </Bottom>
        </Slide>
      )
    })}

  </Deck>
)

const mountPoint = document.getElementById('mountPoint')

render(<App/>, mountPoint)
