---
displayName: "Reference: Timer"
description: "A simple timer component (internally used)"
tags: 
  - Reference
options:
  order: 12
---


# Timer

Dekk provides a simple countdoen timer.

You can use it but it is mainly intended as a tool for
`@dekk/speaker-deck`.

```jsx
import React, {Component} from 'react'
import Countdown from '@dekk/countdown'

class Timer extends Component {
  state: {
    isPlaing: false
  }

  /**
   * Toggle the label text
   */
  get label() {
      return this.state.isPlaying ? 'pause' : 'start'
  }

  /**
   * toggle the state
   */
  handleClick() {
    this.setState(prevState => ({
        isPlaying: !prevState.isPlaying
    }))
  }

  render() {
    <div>
      <button onClick={this.handleClick}>
        {this.label}
      </button>
      <Countdown
        {...this.props} 
        isPlaying={this.state.isPlaying}/>
    </div>
  }
}

```
