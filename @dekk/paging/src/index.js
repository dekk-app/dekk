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
    const {
      page,
      goToPage,
      fragmentCount,
      fragmentHosts,
      goToFragment,
      setFragment
    } = store
    const {length = 0} = fragmentHosts[page]
    const previousFragment = Math.max(0, fragmentCount - 1)
    const nextFragment = Math.min(length - 1, fragmentCount + 1)
    const previousPage = Math.max(0, page - 1)
    const nextPage = Math.min(pages - 1, page + 1)

    switch (which) {
      case 39:
        ;(() => {
          if (length && nextFragment > fragmentCount) {
            goToFragment(nextFragment)
          } else if (nextPage !== page) {
            goToPage(nextPage)
            goToFragment(0)
          }
        })()
        break
      case 37:
        ;(() => {
          if (length && previousFragment < fragmentCount) {
            goToFragment(previousFragment)
          } else if (previousPage !== page) {
            goToPage(previousPage)
            goToFragment(fragmentHosts[previousPage].length - 1)
          }
        })()
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
