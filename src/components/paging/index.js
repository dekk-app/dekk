import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {goToPage} from '../../actions'
import {LIVE, PRESENT} from '../../helpers/query-params'

class Paging extends Component {
  constructor(props) {
    super(props)
    this.goToPage = this.goToPage.bind(this)
  }

  componentWillMount() {
    window.addEventListener(this.props.trigger, this.goToPage)
  }

  componentWillUnmount() {
    window.removeEventListener(this.props.trigger, this.goToPage)
  }

  goToPage({which}) {
    if (LIVE) {
      return
    }
    const {page, pages, goToPage} = this.props
    const previous = Math.max(0, page - 1)
    const next = Math.min((pages - 1), page + 1)

    switch(which) {
      case 39:
        return goToPage(next)
        break
      case 37:
        return goToPage(previous)
        break
      default:
        return false
        break
    }
  }

  render(){
    return null
  }
}

export default connect(state => ({page: state.goToPage.page}), {goToPage})(Paging)
