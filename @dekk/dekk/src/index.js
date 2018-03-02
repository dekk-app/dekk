/* global window */
import React from 'react'
import PropTypes from 'prop-types'
import Deck, {Plugins, Elements} from '@dekk/deck'
import SpeakerDeck from '@dekk/speaker-deck'
import Paging from '@dekk/paging'
import Url, {search} from '@dekk/url'
import LocalStorage from '@dekk/local-storage'

export {default as Slide} from '@dekk/slide'
export {Plugins, Elements}

/**
 * Flag to set presenter mode
 */
const {present, live} = search.parse(window.location.href)

/**
 * A preconfigured Deck with paging, URLs,
 * a presenter mode that can be enabled via the search query `?present=true`
 * and
 * a live mode that can be enabled via the search query `?live=true`
 * @param {Object} props
 *   The properties
 * @param {(Slide|Slide[]|Elements|Elements[]|Plugins|Plugins[])} props.children
 * @param {?(String|Array)} [props.mixin='']
 * @param {number} props.timer
 * @param {number} [props.timerWarning=0]
 *
 * @return {(Deck|SpeakerDeck)}
 */
const Dekk = props => {
  // Render the Speaker Deck
  if (present) {
    return (
      <SpeakerDeck {...props}>
        <Plugins>
          <Paging />
          <Url />
          <LocalStorage publish />
        </Plugins>
        {props.children}
      </SpeakerDeck>
    )
  }
  // Render the live Deck
  if (live) {
    return (
      <Deck {...props}>
        <Plugins>
          <LocalStorage subscribe />
        </Plugins>
        {props.children}
      </Deck>
    )
  }
  // Otherwise render a default Deck
  return (
    <Deck {...props}>
      <Plugins>
        <Paging />
        <Url />
      </Plugins>
      {props.children}
    </Deck>
  )
}

/**
 * @private
 */
Dekk.propTypes = {
  children: PropTypes.node.isRequired,
  timer: PropTypes.number.isRequired,
  timerWarning: PropTypes.number,
  mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
}

/**
 * @private
 */
Dekk.defaultProps = {
  timerWarning: 0,
  mixin: ''
}

export default Dekk
