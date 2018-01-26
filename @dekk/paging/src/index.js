import {Component} from 'react'
import PropTypes from 'prop-types'

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
    const {pages} = this.props
    const {store} = this.context
    const {page, goToPage} = store
    const previous = Math.max(0, page - 1)
    const next = Math.min((pages - 1), page + 1)

    switch (which) {
      case 39:
        goToPage(next)
        break
      case 37:
        goToPage(previous)
        break
      default:
        break
    }
  }

  render() {
    return null
  }
}


Paging.propTypes = {
  trigger: PropTypes.oneOf(['keyup', 'keydown']).isRequired,
  pages: PropTypes.number.isRequired
}

Paging.contextTypes = {
  store: PropTypes.object.isRequired
}

export default Paging
