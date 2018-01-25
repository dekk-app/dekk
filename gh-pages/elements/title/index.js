import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from '@stiligita/core'
import styledReact from '@stiligita/react'
import {title, chapter, cover, divider, content} from './styles.scss'
import {Title as DekkTitle} from '../../../src/components/text'

styled.use(styledReact)

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

export const DividerTitle = styled(DekkTitle)`
  --title-font-size:  4rem;
  width: calc(100% - 5vw);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  align-content: flex-end;
  justify-content: center;
  font-weight: bold;
`

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
