const channels = [...Array(512)].map(() => 0)
const fixtures = [{}]
// effects.js
export const flash(n) => ({})
export const fade(n) => ({})
export const rgb(obj) => ({})


/**
 */
import {* as effects} from './effects'

// effects.flash
// effects.fade
const animations = [
  {
    name: 'flash and fade',
    id: 'FLASH_FADE',
    data: {
      duration: 600000,
      keyframes: {
        ...flash(0, 0.5, 3),
        '0.5': {
          RED: 20,
          GREEN: 20,
          BLUE: 100
        },
         '1': {
          RED: 0,
          GREEN: 0,
          BLUE: 0
        }
      }
    }
  },
  {
    name: 'rainbow',
    id: 'RAINBOW',
    data: {/*  animation data */}
  }
]

const scenes = [{
  name: 'intro scene',
  id: 'INTRO_SCENE',
  animations: [{id: 'FLASH_FADE', start: 0}, {id: 'RAINBOW', start: 0}]
}]

const seclectedFixtures = [{
  id: 'FUN_GENERATION',
  properties: {
    r: {
      id: 'RED',
      channel: 33
    },
    g: {
      id: 'GREEN',
      channel: 34
    },
    b: {
      id: 'BLUE',
      channel: 35
    }
  },
  scenes: [{id: 'INTRO_SCENE', start: 0, trigger: 'DEVICE:CHANNEL:NOTE' }]
}]
