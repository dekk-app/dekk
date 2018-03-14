const execa = require('execa')

execa('yarn', ['run', 'babel:packages:watch'], {stdio: 'inherit'}).catch(console.error)
execa('yarn', ['run', 'watch'], {stdio: 'inherit'}).catch(console.error)
