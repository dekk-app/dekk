import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
      children: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    }
  }

  render() {
    const {ranges, order, options, children} = this.props
    const {length: steps} = ranges
    return (
      <Sequence order={order} steps={steps}>
        {(index, time, timeline) => {
          const renderChildren = () => {
            if (typeof children === 'function') {
              return children(index, time, timeline)
            }
            return children
          }
          return (
            <CodeMirror
              className="__dekk-code__"
              value={renderChildren()}
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
