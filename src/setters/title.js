import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setTitle} from '../actions'

class SetTitle extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.setTitle(this.props.children || '')
  }
  render () {
    return null
  }
}

SetTitle.propTypes = {
  children: PropTypes.node
}

export default connect(state => ({}), {setTitle})(SetTitle)
