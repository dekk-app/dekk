import React, {Component} from 'react'
import PropTypes from 'prop-types'
import dedent from 'dedent'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import {Sequence} from '@dekk/fragment'
import styling from './styles'

class Code extends Component {
  static get defaultProps() {
    return {
      order: 0,
      ranges: undefined,
      options: undefined,
      children: 'const foo = "foo"'
    }
  }

  componentDidMount() {
    styling()
  }

  static get propTypes() {
    return {
      order: PropTypes.number,
      ranges: PropTypes.array,
      options: PropTypes.object,
      children: PropTypes.string
    }
  }

  render() {
    const {ranges, order, options, children} = this.props
    const {length: steps} = ranges
    return (
      <Sequence order={order} steps={steps}>
        {index => {
          return (
            <CodeMirror
              className="__dekk-code__"
              value={children}
              options={options}
              selection={{
                ranges: ranges[index]
              }}
            />
          )
        }}
      </Sequence>
    )
  }
}

export default Code
