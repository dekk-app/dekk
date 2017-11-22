import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import * as reducers from './reducers'

import Uncontrolled, {Deck as Controlled} from './components/deck'

const reducer = combineReducers({
  ...reducers
})

const store = createStore(
  reducer
)

export default function () {
  return (
    <Provider store={store}>
      {this.props.slave ? <Controlled {...this.props}/> : <Uncontrolled {...this.props}/>}
    </Provider>
  )
}
