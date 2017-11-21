import React, {Component} from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import * as reducers from './reducers'

import Deck, {Deck as Slave} from './components/deck'

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

  get deck() {
    if (this.props.slave) {
      return <Slave {...this.props}/>
    }
    return <Deck {...this.props}/>
  }

  render() {
    return (
      <Provider store={store}>
        {this.deck}
      </Provider>
    )
  }
}

export default Dekk
