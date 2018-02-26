import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from './img'
import Mask from './mask'

/**
 * Class for image.
 * It loads an image as a background-image. The original image is still
 * rendered for accessibility reasons.
 * @public
 * @class MaskedImage
 * @reactProps {Object} props
 *   The properties
 * @reactProps {String} props.alt
 * @reactProps {String} props.src
 * @reactProps {?String} props.title
 */
class MaskedImage extends Component {
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
   * @private
   */
  static get defaultProps() {
    return {
      title: ''
    }
  }

  /**
   * Constructs the object.
   * @public
   * @param {Object} props
   *   The properties
   * @param {String} props.alt
   * @param {String} props.src
   * @param {?String} [props.title]
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
      height: this.image.height,
      width: this.image.width
    })
  }

  /**
   * Additional CSS rules for the mask
   * @private
   * @return {String|Array}
   */
  get imageData() {
    return `
      --original-height: ${this.state.height}px;
      --original-width: ${this.state.width}px;
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
      <Mask
        mixin={this.props.mixin}
        imageData={this.imageData}
        className={this.props.className}>
        <Img
          innerRef={this.getImage}
          src={this.props.src}
          alt={this.props.alt}
          title={this.props.title}
          onLoad={this.handleLoad}
        />
      </Mask>
    )
  }
}

export default MaskedImage

export const FitImage = styled(MaskedImage)`
  --image-height: 100%;
  --image-width: 100%;
`
