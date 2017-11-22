import React from 'react'
import PropTypes from 'prop-types'
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
const Dekk = props => (
  <Provider store={store}>
    {props.slave ? <Controlled {...props}/> : <Uncontrolled {...props}/>}
  </Provider>
)

Dekk.propTypes = {
  slave: PropTypes.bool
}

export default Dekk
