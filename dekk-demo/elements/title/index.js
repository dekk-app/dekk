import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {title, chapter, cover, divider, content} from './styles.scss'
import {Title as DekkTitle} from '../../../src/components/text'

const Title = props => (
  <DekkTitle className={title}>
    {props.children}
  </DekkTitle>
)

export const ChapterTitle = props => (
  <DekkTitle className={chapter}>
    <div>{props.children}</div>
  </DekkTitle>
)

export const DividerTitle = props => (
  <DekkTitle className={divider}>
    <div>{props.children}</div>
  </DekkTitle>
)

export const CoverTitle = props => (
  <DekkTitle className={cover}>
    {props.children}
  </DekkTitle>
)

export const ContentTitle = props => (
  <DekkTitle className={content}>
    {props.children}
  </DekkTitle>
)

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

ChapterTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

DividerTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

CoverTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

ContentTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default Title
