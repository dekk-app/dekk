import React, {Children} from 'react'
import classNames from 'classnames'

import Image from '../../src/components/image'
import Text, {
  Title,
  Subtitle
} from '../../src/components/text'

import createMaster, {
  Master,
  Static,
  Slot
} from '../../src/components/master'

import Header from './header'
import Credits from './credits'

import styles from './styles.scss'

const base = className => (
  <Master className={className}>
    <Static name='Header'>
      <Header/>
    </Static>
    <Slot name='Top'
          only={[Title]}
          required/>
    <Slot name='Bottom'
          only={[Subtitle, Credits]}/>
  </Master>
)

export const Blue = createMaster(base(styles.Blue))
Blue.dark = createMaster(base(classNames(styles.Blue, styles.dark)))

export const Red = createMaster(base(styles.Red))
Red.dark = createMaster(base(classNames(styles.Red, styles.dark)))

export const Green = createMaster(base(styles.Green))
Green.dark = createMaster(base(classNames(styles.Green, styles.dark)))
