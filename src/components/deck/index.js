import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import PubNubReact from 'pubnub-react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import Slide from '../slide'
import Paging from '../paging'
import styles from './styles.scss'
import range from '../../helpers/range'
import {LIVE, PRESENT} from '../../helpers/query-params'
import {goToPage} from '../../actions'

/**
 * @private
 * A wrapper around the slides.
 * Includes a paging component to allow navigating the slides.
 * `Deck` itself should not be used. Instead you can use `Dekk`
 * which wraps `Deck` in a store provider.
 * Renders 3 slides (previous, current, next) to allow various transitions
 * between slides.
 */
class Deck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      direction: 0
    }
    if (typeof props.pubnub === 'object' && (LIVE || PRESENT)) {
      this.pubnub = new PubNubReact({
        publishKey: props.pubnub.publishKey,
        subscribeKey: props.pubnub.subscribeKey
      });
      this.pubnub.init(this)
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.page === this.props.page) {
      return
    }
    this.setState({
      direction: this.props.page > newProps.page ? -1 : 1
    })
    if (this.pubnub && PRESENT) {
      this.pubnub.publish({
        message: {
          page: newProps.page
        },
        channel: 'paging'
      })
    }
  }

  componentWillMount() {
    if (this.pubnub && LIVE) {
      this.pubnub.subscribe({
        channels: ['paging'],
        withPresence: true
      })

      this.pubnub.getMessage('paging', (msg) => {
        const {page} = msg.message
          this.props.goToPage(page)
      })
    }
  }

  componentWillUnmount() {
    if (this.pubnub && LIVE) {
      this.pubnub.unsubscribe({
        channels: ['paging']
      })
    }
  }

  /**
   * filters the `children` by a range of `+-1` around the current slide.
   * Therefore renders a maximum of 3 slides (previous, current, next)
   * This allows various transitions between slides.
   *
   * @return {array} returns an array of max 3 slides
   */
  get slides() {
    const {page, children} = this.props
    const {direction} = this.state
    return Children
      .map(children, (child, i) =>
        // clone the element and add properties
        cloneElement(child, {
          pageIndex: i,
          current: page === i,
          previous: page === i + 1,
          next: page === i - 1,
          fromPrevious: page === i && direction === -1,
          fromNext: page === i && direction === 1,
          toPrevious: page === i + 1 && direction === 1,
          toNext: page === i - 1 && direction === -1,
          direction: this.state.direction,
          pubnub: this.props.pubnub
        }))
      // filter by a range of `+-1`
      .filter((c, i) => range(i, page + 1, page - 1))
  }

  render(){
    const {page, children} = this.props
    // Inject the paging logic
    // and render the slides
    return (
      <div className={classNames(this.props.className, styles.deck, {[styles.present]: this.props.present})}>
        <Paging page={page}
                pages={children.length}
                trigger='keyup'/>
        {this.slides}
      </div>
    )
  }
}

Deck.PropTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  page: PropTypes.number.isRequired
}

export default connect(state => ({page: state.goToPage.page}), {goToPage})(Deck)
