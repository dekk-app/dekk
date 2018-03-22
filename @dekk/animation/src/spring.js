import {presets} from 'react-motion'

export default {
  ...presets,
  mid: {
    stiffness: 150,
    damping: 20
  },
  slow: {
    stiffness: 60,
    damping: 30
  },
  fast: {
    stiffness: 300,
    damping: 30
  },
  elastic: {
    stiffness: 150,
    damping: 5
  }
}
