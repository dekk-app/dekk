import React, {Component} from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import * as reducers from './reducers'

import Deck from './components/deck'

const reducer = combineReducers({
  ...reducers
})

const store = createStore(
  reducer
)

class Dekk extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <Deck {...this.props}/>
      </Provider>
    )
  }
}

export default Dekk
