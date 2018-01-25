import {Component} from 'react'
import PropTypes from 'prop-types'
import {goToPage} from '../../actions'
import {LIVE} from '../../helpers/query-params'

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

    switch (which) {
      case 39:
        return goToPage(next)
      case 37:
        return goToPage(previous)
      default:
        return false
    }
  }

  render() {
    return null
  }
}

Paging.propTypes = {
  trigger: PropTypes.oneOf(['keyup', 'keydown']).isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired
}

export default Paging
