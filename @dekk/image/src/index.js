import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

/**
 * Class for image.
 * It loads an image as a background-image. The original image is still
 * rendered for accessibility reasons.
 * @public
 * @class Image
 * @reactProps {Object} props
 *   The properties
 * @reactProps {String} props.alt
 * @reactProps {String} props.src
 * @reactProps {?String} props.title
 */
class Image extends Component {
  /**
   * @private
   */
  state = {}
  /**
   * @private
   * @return {{alt: String, src: String, title: ?String}}
   *   Allowed propTypes for `<Fragment/>`
   */
  static get propTypes() {
    return {
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      title: PropTypes.string
    }
  }
  /**
   * Constructs the object.
   * @private
   * @param {Object} props
   *   The properties
   * @param {String} props.alt
   * @param {String} props.src
   * @param {?String} props.title
   */
  constructor(props) {
    super(props)
    this.getImage = this.getImage.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
  }

  /**
   * Handles the load event of the image.
   * @private
   */
  handleLoad() {
    this.setState({
      loaded: true,
      height: this.image.height,
      width: this.image.width
    })
  }

  /**
   * Additional CSS rules for the mask
   * @private
   * @return {String|Array}
   */
  get mixin() {
    return css`
      --height: ${this.state.height}px;
      --width: ${this.state.width}px;
      background-image: url("${this.props.src}");
    `
  }

  /**
   * Assigns the image to `ref`.
   * @private
   * @param {ReactElement} el
   */
  getImage(el) {
    /**
     * @private
     */
    this.image = el
  }

  /**
   * @private
   * @return {Mask}
   *   An image nested inside a mask
   */
  render() {
    return (
      <Mask mixin={this.mixin}>
        <Img
          ref={this.getImage}
          src={this.props.src}
          alt={this.props.alt}
          title={this.props.title}
          onLoad={this.handleLoad}
        />
      </Mask>
    )
  }
}

/**
 * The image mask
 * @private
 * @type {StyledComponent}
 */
const Mask = styled.div`
  ${props => props.mixin || ''} background-size: cover;
  width: var(--width);
  height: var(--height);
`

/**
 * @private
 * @return {{mixin: ?(String|Array), children: (ReactElement|ReactElement[])}}
 *   Allowed propTypes for `<Mask/>`
 */
Mask.propTypes = {
  mixin: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  children: PropTypes.instanceOf(Img)
}

/**
 * Styled img
 * @private
 * @type {StyledComponent}
 */
const Img = styled.img`
  ${props => (props.loaded ? 'display: none;' : '')};
`

/**
 * @private
 * @return {{loaded: Boolean, onLoad: Function, ref: Function, src: String, alt: String, title ?String)}}
 *   Allowed propTypes for `<Img/>`
 */
Img.propTypes = {
  loaded: PropTypes.boolean,
  onLoad: PropTypes.func,
  ref: PropTypes.func,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default Image
