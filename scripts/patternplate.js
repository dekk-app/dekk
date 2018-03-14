const execa = require('execa')

execa('yarn', ['babel:packages:watch'], {stdio: 'inherit'}).catch(console.error)
execa('yarn', ['patternplate'], {stdio: 'inherit'}).catch(console.error)
