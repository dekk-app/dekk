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
    const {page, goToPage, fragment, fragments, goToFragment, setFragment} = store
    const previousFragment = Math.max(0, fragment - 1)
    const nextFragment = Math.min((fragments - 1), fragment + 1)
    const previousPage = Math.max(0, page - 1)
    const nextPage = Math.min((pages - 1), page + 1)


    switch (which) {
      case 39:
        (fragments && nextFragment > fragment) ? goToFragment(nextFragment) : goToPage(nextPage)
        break
      case 37:
        (fragments && previousFragment < fragment) ? goToFragment(previousFragment) : goToPage(previousPage)
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
