import React from 'react'
import classNames from 'classnames'

import createMaster, {
  Master,
  Static,
  Slot
} from '../../src/components/master'

import Title, {ChapterTitle, DividerTitle, CoverTitle} from '../elements/title'
import Subtitle from '../elements/subtitle'
import Header from './header'
import Credits from './credits'

import styles from './styles.scss'

const base = className => (
  <Master className={className}>
    <Static name='Header'>
      <Header/>
    </Static>
    <Slot name='View'/>
  </Master>
)

const chapter = className => (
  <Master className={className}>
    <Static name='Header'>
      <Header/>
    </Static>
    <Slot name='View'
          only={[ChapterTitle]}
          required/>
  </Master>
)

const divider = className => (
  <Master className={className}>
    <Static name='Header'>
      <Header/>
    </Static>
    <Slot name='Top'
          only={[DividerTitle]}
          required/>
    <Slot name='Bottom'
          only={[Credits]}/>
  </Master>
)

const cover = className => (
  <Master className={className}>
    <Static name='Header'>
      <Header/>
    </Static>
    <Slot name='View'
          only={[CoverTitle]}
          required/>
  </Master>
)

export const Blue = createMaster(base(styles.Blue))
Blue.dark = createMaster(base(classNames(styles.Blue, styles.dark)))

export const Red = createMaster(base(styles.Red))
Red.dark = createMaster(base(classNames(styles.Red, styles.dark)))

export const Green = createMaster(base(styles.Green))
Green.dark = createMaster(base(classNames(styles.Green, styles.dark)))

export const BlueChapter = createMaster(chapter(styles.BlueChapter))
BlueChapter.dark = createMaster(chapter(classNames(styles.BlueChapter, styles.dark)))

export const RedChapter = createMaster(chapter(styles.RedChapter))
RedChapter.dark = createMaster(chapter(classNames(styles.RedChapter, styles.dark)))

export const GreenChapter = createMaster(chapter(styles.GreenChapter))
GreenChapter.dark = createMaster(chapter(classNames(styles.GreenChapter, styles.dark)))

export const BlueDivider = createMaster(divider(styles.BlueDivider))
BlueDivider.dark = createMaster(divider(classNames(styles.BlueDivider, styles.dark)))

export const RedDivider = createMaster(divider(styles.RedDivider))
RedDivider.dark = createMaster(divider(classNames(styles.RedDivider, styles.dark)))

export const GreenDivider = createMaster(divider(styles.GreenDivider))
GreenDivider.dark = createMaster(divider(classNames(styles.GreenDivider, styles.dark)))

export const BlueCover = createMaster(cover(styles.BlueCover))
BlueCover.dark = createMaster(cover(classNames(styles.BlueCover, styles.dark)))

export const RedCover = createMaster(cover(styles.RedCover))
RedCover.dark = createMaster(cover(classNames(styles.RedCover, styles.dark)))

export const GreenCover = createMaster(cover(styles.GreenCover))
GreenCover.dark = createMaster(cover(classNames(styles.GreenCover, styles.dark)))
