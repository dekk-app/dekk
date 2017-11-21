import React, {Component} from 'react'
import {render} from 'react-dom'
import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'
import * as reducers from './reducers'
import {goToPage} from './actions'

import classNames from 'classnames'

import Deck from '../src'
import Slide from '../src/components/slide'
import {Title, Subtitle} from '../src/components/text'
import styles from './styles.scss'

const reducer = combineReducers({
  ...reducers
})

const store = createStore(
  reducer
)

const slides = [
  <Slide key='slide_1'>
    <Title>Hello Dekk!</Title>
  </Slide>,
  <Slide key='slide_2'>
    <Title>built with react.js</Title>
    <Subtitle>next generation presentation tool</Subtitle>
  </Slide>
]
let Dekk = props => {
  const nextPage = () => {
    props.goToPage(props.page + 1)
  }

  const previousPage = () => {
    props.goToPage(props.page - 1)
  }

  return (
  <div className={styles.artboard}>
    <header className={styles.header}/>
    <aside className={styles.sidebarLeft}>
      <button onClick={previousPage} disabled={props.page === 0}>-</button>
      <button onClick={nextPage} disabled={props.page === slides.length - 1}>+</button>
    </aside>
    <aside className={styles.sidebarRight}/>
    <div className={styles.dekkWrapper}>
      <Deck className={styles.dekk}
            page={props.page}
            slave>
        {slides}
      </Deck>
    </div>
  </div>
)
}

Dekk = connect(state => state, {goToPage})(Dekk)

const App = () => {
  return (
    <Provider store={store}>
      <Dekk/>
    </Provider>
  )
}
const mountPoint = document.getElementById('mountPoint')

render(<App/>, mountPoint)
