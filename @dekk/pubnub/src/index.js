import {Component} from 'react'
import PropTypes from 'prop-types'
import PubNubReact from 'pubnub-react'
import {isNumeric} from '@dekk/utils'

/**
 * @public
 * @param {Object} props
 *   The properties
 * @param {Boolean} props.publishKey
 * @param {Boolean} props.subscribeKey
 * @param {Boolean} props.publish
 * @param {Boolean} props.subscribe
 * @param {number} props.slideIndex
 *   (Injected via Dekk)
 * @param {number} props.fragmentIndex
 *   (Injected via Dekk)
 * @param {Function} props.toFragment
 *   (Injected via Dekk)
 * @param {Function} props.toSlide
 *   (Injected via Dekk)
 * @example
 * import Deck, {Plugins} from '@dekk/deck'
 * import Pubnub from '@dekk/pubnub'
 *
 * const creds = {
 *   subscribeKey: 'sub-123456789',
 *   publishKey: 'pub-123456789'
 * }
 * // This deck is subscribed to a pubnub channel
 * export default (
 *   <Deck>
 *     <Plugins>
 *       <Pubnub {..creds} channel='MY_CHANNEL_ID' subscribe/>
 *     </Plugins>
 *   </Deck>
 * )
 */
export default class Pubnub extends Component {
  /**
   * @private
   */
  static get propTypes() {
    return {
      publishKey: PropTypes.string.isRequired,
      subscribeKey: PropTypes.string.isRequired,
      channel: PropTypes.string,
      subscribe: PropTypes.bool,
      publish: PropTypes.bool,
      slideIndex: PropTypes.number,
      fragmentIndex: PropTypes.number,
      toFragment: PropTypes.func,
      toSlide: PropTypes.func
    }
  }

  /**
   * @private
   */
  static get defaultProps() {
    return {
      channel: '@dekk',
      subscribe: false,
      publish: false,
      slideIndex: 0,
      fragmentIndex: 0,
      toFragment: () => null,
      toSlide: () => null
    }
  }

  /**
   * @public
   * @param {Object} props
   *   The properties
   * @param {Boolean} props.publishKey
   * @param {Boolean} props.subscribeKey
   * @param {Boolean} props.publish
   * @param {Boolean} props.subscribe
   * @param {number} props.slideIndex
   *   (Injected via Dekk)
   * @param {number} props.fragmentIndex
   *   (Injected via Dekk)
   * @param {Function} props.toFragment
   *   (Injected via Dekk)
   * @param {Function} props.toSlide
   *   (Injected via Dekk)
   */
  constructor(props) {
    super(props)
    const {publishKey, subscribeKey} = this.props
    /**
     * Pubnub instance
     * @private
     */
    this.pubnub = new PubNubReact({publishKey, subscribeKey})
    this.pubnub.init(this)
  }

  /**
   * Before mounting we need to ensure that pubnub is configured correctly.
   * We want to allow getting the history to allow reloading decks.
   * @private
   */
  componentWillMount() {
    this.pubnub.subscribe({
      channels: [this.props.channel]
    })

    if (this.props.subscribe) {
      // Get the last message from the history
      this.pubnub.history({channel: this.props.channel}).then(response => {
        const lastMessage = response.messages.pop()
        if (lastMessage) {
          this.handleMessage(lastMessage.entry)
        }
      })

      // Subscribe to new messages
      this.pubnub.getMessage(this.props.channel, data => {
        this.handleMessage(data.message)
      })
    }
  }

  /**
   * @private
   * @param {String} message
   *   The mesage that has been sent
   */
  handleMessage(message) {
    // Only allow messages of type `object`
    if (typeof message === 'object') {
      const {slideIndex, fragmentIndex} = message
      if (isNumeric(slideIndex) && isNumeric(fragmentIndex)) {
        this.props.toSlide(slideIndex)
        this.props.toFragment(fragmentIndex)
      }
    }
  }

  /**
   * Unsubscribe when unmounted
   * @private
   */
  componentWillUnmount() {
    this.pubnub.unsubscribe({channels: [this.props.channel]})
  }

  /**
   * When the props change we need to publish the changes.
   * To prevent flooding we only publish when the slideIndex or fragmentIndex
   * change.
   * @private
   */
  componentWillReceiveProps({slideIndex, fragmentIndex, publish}) {
    if (publish) {
      if (
        slideIndex !== this.props.slideIndex ||
        fragmentIndex !== this.props.fragmentIndex
      ) {
        const message = {
          slideIndex,
          fragmentIndex
        }
        this.pubnub.publish({
          message,
          channel: this.props.channel
        })
      }
    }
  }

  /**
   * @private
   */
  render() {
    return null
  }
}
