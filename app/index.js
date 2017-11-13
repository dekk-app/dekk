import React from 'react'
import {render} from 'react-dom'

const App = () => <h1>Hello world!</h1>

const mountPoint = document.getElementById('mountPoint')

render(<App/>, mountPoint)
