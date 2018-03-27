/* global window */
import React, {Children} from 'react'
import PropTypes from 'prop-types'
import Deck, {Plugins, Elements} from '@dekk/deck'
import SpeakerDeck, {
  Preview as NextView
  // View as CurrentView
} from '@dekk/speaker-deck'
import Paging from '@dekk/paging'
import Url, {search} from '@dekk/url'
import LocalStorage from '@dekk/local-storage'

export {default as Slide} from '@dekk/slide'
export {Plugins, Elements}

/**
 * Flag to set presenter mode
 */
const {present = null, live = null, preview = null} = search.parse(
  window.location.href
)

export const Live = ({children}) =>
  live !== null && <React.Fragment>{children}</React.Fragment>
export const Present = ({children}) =>
  present !== null && <React.Fragment>{children}</React.Fragment>
export const Preview = ({children}) =>
  preview !== null && <React.Fragment>{children}</React.Fragment>

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
      <SpeakerDeck
        {...props}
        mixin={[
          ...props.mixin,
          `
        --header-height: 0;
        --footer-height: 0;
        `
        ]}>
        <Plugins>
          <Paging />
          <Url />
          <LocalStorage publish />
        </Plugins>
        {Children.toArray(props.children).filter(x => {
          if (typeof x === 'object' && x) {
            return x.type !== Elements
          }
          return false
        })}
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
        {Children.toArray(props.children).filter(x => {
          if (typeof x === 'object' && x) {
            return x.type !== Plugins
          }
          return false
        })}
      </Deck>
    )
  }
  // Render the preview Deck
  if (preview === 0) {
    return (
      <Deck {...props}>
        <Plugins>
          <LocalStorage subscribe />
        </Plugins>
        {Children.toArray(props.children).filter(x => {
          if (typeof x === 'object' && x) {
            return x.type !== Plugins
          }
          return false
        })}
      </Deck>
    )
  }
  if (preview === 1) {
    return (
      <NextView {...props}>
        <Plugins>
          <LocalStorage subscribe />
        </Plugins>
        {Children.toArray(props.children).filter(x => {
          if (typeof x === 'object' && x) {
            return x.type !== Plugins
          }
          return false
        })}
      </NextView>
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
